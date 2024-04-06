import type { MenuProps } from 'antd'
import { Dropdown, Tabs } from 'antd'
import type { CSSProperties } from 'react'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFullscreen } from 'ahooks'
import styled from 'styled-components'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  restrictToHorizontalAxis,
} from '@dnd-kit/modifiers'

import { useNavigate } from 'react-router-dom'
import Iconify from '@/components/icon/IconifyIcon'
import { type KeepAliveTab, useKeepAlive } from '@/hooks/router'

import { MultiTabOperation, SpecialRouterEnum } from '#/enum'
import { useThemeToken } from '@/hooks/theme'
import { useMenuInfo, useMenuInfoActions } from '@/store/useMenuInfo'
import { replaceDynamicParams, useMatchRouteMeta } from '@/hooks/router'

interface Props {
  offsetTop?: boolean
}

const StyledMultiTabs = styled.div`
  height: 100%;
  margin-top: 2px;
  .anticon {
    margin: 0px !important;
  }
  .ant-tabs {
    height: 100%;
    .ant-tabs-content {
      height: 100%;
    }
    .ant-tabs-tabpane {
      height: 100%;
      & > div {
        height: 100%;
      }
    }

    .ant-tabs-tab{
      padding: 0;
      margin-bottom: 2px;
      margin-left: 2px !important;
    }

    .ant-tabs-nav-operations{
      display: none;
    }
  }

  /* 隐藏滚动条 */
  .hide-scrollbar {
    overflow: scroll;
    flex-shrink: 0;
    scrollbar-width: none; /* 隐藏滚动条 Firefox */
    -ms-overflow-style: none; /* 隐藏滚动条 IE/Edge */
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none; /* 隐藏滚动条 Chrome/Safari/Opera */
  }
`

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-node-key': string
}

function DraggableTabNode(props: DraggableTabPaneProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props['data-node-key'],
  })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition,
  }

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
}

export default function MultiTabs(_props: Props) {
  const { t } = useTranslation()
  const scrollContainer = useRef<HTMLDivElement>(null!)
  const [hoveringTabKey, setHoveringTabKey] = useState('')
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('')
  const themeToken = useThemeToken()
  const navigate = useNavigate()

  const tabContentRef = useRef<HTMLDivElement>(null!)

  const [_, { toggleFullscreen: toggleFullScreen }] = useFullscreen(tabContentRef)

  const { tabsList } = useMenuInfo()
  const currentRouteMeta = useMatchRouteMeta()
  const { setRouteInfo } = useMenuInfoActions()
  const {
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOthersTab,
    closeAll,
    closeLeft,
    closeRight,
  } = useKeepAlive()

  /**
   * tab dropdown下拉选
   */
  const menuItems = useMemo<MenuProps['items']>(
    () => {
      const currentIndex = tabsList.findIndex(tab => tab.key === openDropdownTabKey)
      const otherLength = tabsList.filter(item => item.key !== SpecialRouterEnum.HOME
        && item.key !== openDropdownTabKey,
      )
      return [
        {
          label: t(`sys.tab.${MultiTabOperation.FULLSCREEN}`),
          key: MultiTabOperation.FULLSCREEN,
          icon: <Iconify icon="material-symbols:fullscreen" size={18} />,
        },
        {
          label: t(`sys.tab.${MultiTabOperation.REFRESH}`),
          key: MultiTabOperation.REFRESH,
          icon: <Iconify icon="mdi:reload" size={18} />,
        },
        {
          label: t(`sys.tab.${MultiTabOperation.CLOSE}`),
          key: MultiTabOperation.CLOSE,
          icon: <Iconify icon="material-symbols:close" size={18} />,
          disabled: tabsList.length === 1 || openDropdownTabKey === SpecialRouterEnum.HOME,
        },
        {
          type: 'divider',
        },
        {
          label: t(`sys.tab.${MultiTabOperation.CLOSELEFT}`),
          key: MultiTabOperation.CLOSELEFT,
          icon: (
            <Iconify
              icon="material-symbols:tab-close-right-outline"
              size={18}
              className="rotate-180"
            />
          ),
          disabled: currentIndex === 0 || currentIndex === 1,
        },
        {
          label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
          key: MultiTabOperation.CLOSERIGHT,
          icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
          disabled: currentIndex === tabsList.length - 1,
        },
        {
          type: 'divider',
        },
        {
          label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
          key: MultiTabOperation.CLOSEOTHERS,
          icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
          disabled: otherLength.length === 0,
        },
        {
          label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
          key: MultiTabOperation.CLOSEALL,
          icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
          disabled: tabsList.length === 1,
        },
      ]
    },
    [openDropdownTabKey, t, tabsList, currentRouteMeta],
  )

  /**
   * tab dropdown click
   */
  const menuClick = useCallback(
    (menuInfo: any, tab: KeepAliveTab) => {
      const { key, domEvent } = menuInfo
      domEvent.stopPropagation()
      switch (key) {
        case MultiTabOperation.REFRESH:
          refreshTab(tab.key)
          break
        case MultiTabOperation.CLOSE:
          closeTab(tab.key)
          break
        case MultiTabOperation.CLOSEOTHERS:
          closeOthersTab(tab.key)
          break
        case MultiTabOperation.CLOSELEFT:
          closeLeft(tab.key)
          break
        case MultiTabOperation.CLOSERIGHT:
          closeRight(tab.key)
          break
        case MultiTabOperation.CLOSEALL:
          closeAll()
          break
        case MultiTabOperation.FULLSCREEN:
          toggleFullScreen()
          break
        default:
          break
      }
    },
    [refreshTab, closeTab, closeOthersTab, closeLeft, closeRight, closeAll, toggleFullScreen],
  )

  /**
   * 当前显示dorpdown的tab
   */
  const onOpenChange = (open: boolean, tab: KeepAliveTab) => {
    if (open)
      setopenDropdownTabKey(tab.key)
    else
      setopenDropdownTabKey('')
  }

  /**
   * tab样式
   */
  const calcTabStyle: (tab: KeepAliveTab) => CSSProperties = useCallback(
    (tab) => {
      const isActive = tab.key === activeTabRoutePath || tab.key === hoveringTabKey
      const result: CSSProperties = {
        borderRadius: '8px 8px 0 0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: themeToken.colorBorderSecondary,
        backgroundColor: themeToken.colorBgLayout,
        transition:
          'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      }

      if (isActive) {
        result.backgroundColor = themeToken.colorBgContainer
        result.color = themeToken.colorPrimaryText
      }
      return result
    },
    [activeTabRoutePath, hoveringTabKey, themeToken],
  )

  /**
   * 渲染单个tab
   */
  const renderTabLabel = useCallback(
    (tab: KeepAliveTab & {
      outlet: any
    }) => {
      if (tab.hideTab)
        return null
      return (
        <Dropdown
          trigger={['contextMenu']}
          menu={{ items: menuItems, onClick: menuInfo => menuClick(menuInfo, tab) }}
          onOpenChange={open => onOpenChange(open, tab)}
        >
          <div
            id={`tab-${tab?.key}`}
            onClick={() => {
              const tabKey = replaceDynamicParams(tab?.key, tab?.params)

              navigate({
                pathname: tabKey,
                search: tab?.search,
              }, {
                state: tab?.state,
              })
            }}
            className="relative mx-px flex select-none items-center px-4 py-1"
            style={calcTabStyle(tab)}
            onMouseEnter={() => {
              if (tab.key === activeTabRoutePath)
                return
              setHoveringTabKey(tab.key)
            }}
            onMouseLeave={() => setHoveringTabKey('')}
          >
            <div>
              {tab?.state?.[SpecialRouterEnum.TAB_TITLE] ? `${tab?.state?.[SpecialRouterEnum.TAB_TITLE]}-` : ''}
              {t(tab.label)}
            </div>
            {tab?.key !== SpecialRouterEnum.HOME && (
              <Iconify
                icon="ion:close-outline"
                size={18}
                className="cursor-pointer opacity-50"
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(tab.key)
                }}
                style={{
                  visibility:
                  (tab.key !== activeTabRoutePath && tab.key !== hoveringTabKey)
                  || tabsList.length === 1
                    ? 'hidden'
                    : 'visible',
                }}
              />
            )}
          </div>
        </Dropdown>
      )
    },
    [
      t,
      menuItems,
      activeTabRoutePath,
      hoveringTabKey,
      tabsList.length,
      menuClick,
      closeTab,
      calcTabStyle,
    ],
  )

  /**
   * 所有tab
   */

  const tabItems = useMemo(() => {
    return tabsList.map(({ icon = '', ...item }) => {
      if (item?.key === currentRouteMeta?.key || item?.multiple) {
        const tab = { ...item, outlet: currentRouteMeta?.outlet }
        return {
          label: renderTabLabel(tab),
          key: tab.key,
          closable: tabsList.length > 1, // 保留一个
          children: (
            <div ref={tabContentRef} key={tab.timeStamp}>
              {tab.outlet}
            </div>
          ),
        }
      }
      else {
        return {
          ...item,
          label: renderTabLabel({ ...item, outlet: null }),
          key: item.key,
          closable: tabsList.length > 1, // 保留一个
          children: null,
        }
      }
    })
  }, [tabsList, currentRouteMeta, tabsList, renderTabLabel])

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active?.id === SpecialRouterEnum.HOME || over?.id === SpecialRouterEnum.HOME)
      return
    if (active.id !== over?.id) {
      const newList = [...tabsList]
      const activeIndex = newList.findIndex(tab => tab.key === active.id)
      const overIndex = newList.findIndex(tab => tab.key === over?.id)
      const list = arrayMove(newList, activeIndex, overIndex)
      setRouteInfo({ tabsList: list })
    }
  }

  /**
   * 路由变化时，滚动到指定tab
   */
  useEffect(() => {
    if (!scrollContainer || !scrollContainer.current)
      return

    const index = tabsList.findIndex(tab => tab.key === activeTabRoutePath)
    const currentTabElement = scrollContainer.current.querySelector(`#tab-${index}`)
    if (currentTabElement) {
      currentTabElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [activeTabRoutePath, tabsList])

  /**
   * scrollContainer 监听wheel事件
   */
  useEffect(() => {
    function handleMouseWheel(event: WheelEvent) {
      event.preventDefault()
      scrollContainer.current!.scrollLeft += event.deltaY
    }

    scrollContainer.current!.addEventListener('mouseenter', () => {
      scrollContainer.current!.addEventListener('wheel', handleMouseWheel)
    })
    scrollContainer.current!.addEventListener('mouseleave', () => {
      scrollContainer.current!.removeEventListener('wheel', handleMouseWheel)
    })
  }, [])

  return (
    <StyledMultiTabs>
      <Tabs
        size="small"
        tabBarGutter={4}
        activeKey={activeTabRoutePath}
        items={tabItems}
        renderTabBar={(tabBarProps, DefaultTabBar) => (
          <div ref={scrollContainer}>
            <DndContext sensors={[sensor]} onDragEnd={onDragEnd} modifiers={[restrictToHorizontalAxis]}>
              <SortableContext items={tabsList.map(i => i.key)} strategy={horizontalListSortingStrategy}>
                <DefaultTabBar {...tabBarProps}>
                  {(node) => {
                    if (node.key === SpecialRouterEnum.HOME)
                      return node
                    return (
                      <DraggableTabNode
                        {...node.props}
                        key={node.key}
                        isDragDisabled={node.key === SpecialRouterEnum.HOME}
                      >
                        {node}
                      </DraggableTabNode>
                    )
                  }}
                </DefaultTabBar>
              </SortableContext>
            </DndContext>
          </div>
        )}
      />
    </StyledMultiTabs>
  )
}
