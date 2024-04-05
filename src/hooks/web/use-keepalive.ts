import { useCallback, useEffect, useState } from 'react'

import { useMatchRouteMeta, useRouter } from '@/hooks/router'

import type { RouteMeta } from '#/router'
import { useMenuInfo, useMenuInfoActions } from '@/store/useMenuInfo'
import { SpecialRouterEnum } from '#/enum'

export type KeepAliveTab = (Omit<RouteMeta, 'outlet'>)

export function useKeepAlive() {
  const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env
  const { push } = useRouter()
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
      setRouteInfo({ tabsList })
    },

    [activeTabRoutePath, tabsList],
  )

  /**
   * Close other tabsList besides the specified tab
   */
  const closeOthersTab = useCallback(
    (path = activeTabRoutePath) => {
      setRouteInfo({
        tabsList: tabsList.filter(item => item?.key === path || item?.key === SpecialRouterEnum.HOME),
      })

      if (path !== activeTabRoutePath)
        push(path)
    },
    [activeTabRoutePath, push, tabsList],
  )

  /**
   * Close all tabsList then navigate to the home page
   */
  const closeAll = useCallback(() => {
    // setTabs([tabHomePage]);
    setRouteInfo({
      tabsList: tabsList.filter(item => item?.key === SpecialRouterEnum.HOME),
    })
    push(HOMEPAGE)
  }, [push, tabsList])

  /**
   * Close all tabsList in the left of specified tab
   */
  const closeLeft = useCallback(
    (path: string) => {
      const currentTabIndex = tabsList.findIndex(item => item?.key === path)
      setRouteInfo({
        tabsList: tabsList.filter((item, index) => index >= currentTabIndex || item?.key === SpecialRouterEnum.HOME),
      })
      push(path)
    },
    [push, tabsList, tabsList],
  )

  /**
   * Close all tabsList in the right of specified tab
   */
  const closeRight = useCallback(
    (path: string) => {
      const currentTabIndex = tabsList.findIndex(item => item?.key === path)
      setRouteInfo({
        tabsList: tabsList.filter((item, index) => index <= currentTabIndex || item?.key === SpecialRouterEnum.HOME),
      })
      push(path)
    },
    [push, tabsList, tabsList],
  )

  /**
   * Refresh specified tab
   */
  const refreshTab = useCallback(
    (path = activeTabRoutePath) => {
      const prev = [...tabsList]
      const index = prev.findIndex(item => item?.key === path)

      if (index >= 0)
        prev[index].timeStamp = getKey()

      setRouteInfo({
        tabsList: [...prev],
      })
    },
    [activeTabRoutePath, tabsList],
  )

  useEffect(() => {
    if (!currentRouteMeta)
      return
    const existed = tabsList.find(item => item.key === currentRouteMeta.key)

    if (!existed) {
      const { outlet = '', ...info } = currentRouteMeta
      setRouteInfo({
        tabsList: [
          ...tabsList,
          {
            ...info,
            timeStamp: getKey(),
          },
        ],
      })
    }

    setActiveTabRoutePath(currentRouteMeta?.key)
  }, [currentRouteMeta])

  return {
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

function getKey() {
  return new Date().getTime().toString()
}
