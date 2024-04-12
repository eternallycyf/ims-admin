import { useCallback, useEffect, useState } from 'react'

import _ from 'lodash'
import { useLatest } from 'ahooks'
import { replaceDynamicParams, useMatchRouteMeta, useRouter } from '@/hooks/router'

import type { RouteMeta } from '#/router'
import { useMenuInfo, useMenuInfoActions } from '@/store/useMenuInfo'

export type KeepAliveTab = (Omit<RouteMeta, 'outlet'>)

export function useKeepAlive() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
  const { push } = useRouter()

  // chche tabsList
  const [cacheTabs, setCacheTabs] = useState<(KeepAliveTab & { outlet?: any })[]>([])
  const cacheTabsRef = useLatest<(KeepAliveTab & { outlet?: any })[]>(cacheTabs)

  const { tabsList = [] } = useMenuInfo()
  const { setRouteInfo } = useMenuInfoActions()
  // tabsList
  // active tab
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>('')

  // current route meta
  const currentRouteMeta = useMatchRouteMeta()

  /**
   * Close specified tab
   */
  const closeTab = useCallback(
    (path = activeTabRoutePath, _tabsList: KeepAliveTab[]) => {
      const tabsList = [..._tabsList]
      if (tabsList.length === 1)
        return
      const deleteTabIndex = tabsList.findIndex(item => item.key === path)
      if (deleteTabIndex > 0)
        push(tabsList[deleteTabIndex - 1].key)
      else push(tabsList[deleteTabIndex + 1].key)

      tabsList.splice(deleteTabIndex, 1)
      setCacheTabs([...tabsList])
      setRouteInfo({ tabsList })
    },

    [activeTabRoutePath, tabsList, cacheTabs],
  )

  /**
   * Close other tabsList besides the specified tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      const getNewList = (tabsList: KeepAliveTab[]) => tabsList.filter(item => item?.key === path || item?.key === HOMEPAGE)
      setCacheTabs(getNewList)
      setRouteInfo({ tabsList: getNewList(tabsList) })

      if (path !== activeTabRoutePath)
        push(path)
    },
    [activeTabRoutePath, push, tabsList, cacheTabs],
  )

  /**
   * Close all tabsList then navigate to the home page
   */
  const closeAll = useCallback(() => {
    const getNewList = (tabsList: KeepAliveTab[]) => tabsList.filter(item => item?.key === HOMEPAGE)
    setCacheTabs(getNewList)
    setRouteInfo({ tabsList: getNewList(tabsList) })
    push(HOMEPAGE)
  }, [push, tabsList, cacheTabs])

  /**
   * Close all tabsList in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabsList.findIndex(item => item?.key === path)
      const getNewList = (tabsList: KeepAliveTab[]) => tabsList.filter((item, index) => index >= currentTabIndex || item?.key === HOMEPAGE)
      setCacheTabs(getNewList)
      setRouteInfo({ tabsList: getNewList(tabsList) })
      push(path)
    },
    [push, tabsList, tabsList, cacheTabs],
  )

  /**
   * Close all tabsList in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabsList.findIndex(item => item?.key === path)
      const getNewList = (tabsList: KeepAliveTab[]) => tabsList.filter((item, index) => index <= currentTabIndex || item?.key === HOMEPAGE)
      setCacheTabs(getNewList)
      setRouteInfo({ tabsList: getNewList(tabsList) })
      push(path)
    },
    [push, tabsList, tabsList, cacheTabs],
  )

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      const getNewList = (tabsList: KeepAliveTab[]) => {
        const prev = [...tabsList]
        const index = prev.findIndex(item => item?.key === path)

        if (index >= 0)
          prev[index].timeStamp = getTimeStamp()
        return prev
      }

      setCacheTabs(getNewList)
      setRouteInfo({ tabsList: getNewList(tabsList) })
    },
    [activeTabRoutePath, tabsList, cacheTabs],
  )

  useEffect(() => {
    if (!currentRouteMeta)
      return
    let { key } = currentRouteMeta
    const { outlet: _outlet, params = {} } = currentRouteMeta

    if (!_.isEmpty(params))
      key = replaceDynamicParams(key, params)

    const existed = tabsList.find(item => item.key === key)

    if (!existed) {
      const { outlet = '', params = undefined, search = '', state = undefined, suffix, ...info } = currentRouteMeta

      const item: KeepAliveTab = {
        ...info,
        key,
        timeStamp: getTimeStamp(),
      } as KeepAliveTab
      if (params)
        item.params = params
      if (search)
        item.search = search
      if (state)
        item.state = state
      setCacheTabs([...tabsList, {
        ...item,
        outlet,
      }].filter(item => !item.hideTab))
      setRouteInfo({ tabsList: [...tabsList, item].filter(item => !item.hideTab) })
    }
    else {
      const newTabList = [...tabsList]
      const newCacheTabsList: (KeepAliveTab & { outlet?: any })[] = cacheTabsRef.current?.length > 0
        ? [...cacheTabsRef.current]
        : [...newTabList]

      const index = newTabList.findIndex(item => item.key === key)
      const cacheItem: any = cacheTabsRef.current[index] || tabsList[index]

      let isRefresh = false

      if (currentRouteMeta.params) {
        newTabList[index] = {
          ...newTabList[index],
          params: currentRouteMeta?.params,
        }
        isRefresh = true
      }

      if (currentRouteMeta.search) {
        newTabList[index] = {
          ...newTabList[index],
          search: currentRouteMeta?.search,
        }
        isRefresh = true
      }

      if (currentRouteMeta.state) {
        newTabList[index] = {
          ...newTabList[index],
          state: currentRouteMeta?.state,
        }
        isRefresh = true
      }

      if (!cacheItem?.outlet) {
        newCacheTabsList[index] = {
          ...newCacheTabsList[index],
          outlet: _outlet,
        }
        isRefresh = true
      }

      if (isRefresh) {
        newCacheTabsList[index] = {
          ...newTabList[index],
          ...newCacheTabsList[index],
          timeStamp: getTimeStamp(),
        }
        setCacheTabs([...newCacheTabsList].filter(item => !item.hideTab))
      }

      if (isRefresh && !_.isEqual(newTabList[index], tabsList[index])) {
        newTabList[index] = {
          ...newTabList[index],
          timeStamp: getTimeStamp(),
        }
        setRouteInfo({ tabsList: newTabList.filter(item => !item.hideTab) })
      }

      isRefresh = false
    }

    setActiveTabRoutePath(key)
  }, [currentRouteMeta])

  return {
    cacheTabs,
    setCacheTabs,
    tabsList,
    activeTabRoutePath,
    closeTab: (path: string) => closeTab(path, tabsList),
    closeOthersTab,
    refreshTab,
    closeAll,
    closeLeft,
    closeRight,
  }
}

function getTimeStamp() {
  return new Date().getTime().toString()
}
