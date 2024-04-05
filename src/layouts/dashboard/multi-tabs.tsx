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

import { Iconify } from '@/components/icon'
import { type KeepAliveTab, useKeepAlive } from '@/hooks/web'

import { MultiTabOperation } from '#/enum'
import { useThemeToken } from '@/hooks/theme'
import { useRouter } from '@/hooks/router'

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
  const { push } = useRouter()
  const scrollContainer = useRef<HTMLDivElement>(null!)
  const [hoveringTabKey, setHoveringTabKey] = useState('')
  const [openDropdownTabKey, setopenDropdownTabKey] = useState('')
  const themeToken = useThemeToken()

  const tabContentRef = useRef<HTMLDivElement>(null!)

  const [_, { toggleFullscreen: toggleFullScreen }] = useFullscreen(tabContentRef)

  const {
    tabs,
    activeTabRoutePath,
    setTabs,
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
    () => [
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
        disabled: tabs.length === 1,
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
        disabled: tabs.findIndex(tab => tab.key === openDropdownTabKey) === 0,
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSERIGHT}`),
        key: MultiTabOperation.CLOSERIGHT,
        icon: <Iconify icon="material-symbols:tab-close-right-outline" size={18} />,
        disabled: tabs.findIndex(tab => tab.key === openDropdownTabKey) === tabs.length - 1,
      },
      {
        type: 'divider',
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEOTHERS}`),
        key: MultiTabOperation.CLOSEOTHERS,
        icon: <Iconify icon="material-symbols:tab-close-outline" size={18} />,
        disabled: tabs.length === 1,
      },
      {
        label: t(`sys.tab.${MultiTabOperation.CLOSEALL}`),
        key: MultiTabOperation.CLOSEALL,
        icon: <Iconify icon="mdi:collapse-all-outline" size={18} />,
      },
    ],
    [openDropdownTabKey, t, tabs],
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
    (tab: KeepAliveTab) => {
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
            onClick={() => push(tab.key)}
            className="relative mx-px flex select-none items-center px-4 py-1"
            style={calcTabStyle(tab)}
            onMouseEnter={() => {
              if (tab.key === activeTabRoutePath)
                return
              setHoveringTabKey(tab.key)
            }}
            onMouseLeave={() => setHoveringTabKey('')}
          >
            <div>{t(tab.label)}</div>
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
                  || tabs.length === 1
                    ? 'hidden'
                    : 'visible',
              }}
            />
          </div>
        </Dropdown>
      )
    },
    [
      t,
      menuItems,
      activeTabRoutePath,
      hoveringTabKey,
      tabs.length,
      menuClick,
      closeTab,
      calcTabStyle,
    ],
  )

  /**
   * 所有tab
   */

  const tabItems = useMemo(() => {
    return tabs?.map(tab => ({
      label: renderTabLabel(tab),
      key: tab.key,
      closable: tabs.length > 1, // 保留一个
      children: (
        <div ref={tabContentRef} key={tab.timeStamp}>
          {tab.children}
        </div>
      ),
    }))
  }, [tabs, renderTabLabel])

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabs((prev) => {
        const activeIndex = prev.findIndex(i => i.key === active.id)
        const overIndex = prev.findIndex(i => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      })
    }
  }

  /**
   * 路由变化时，滚动到指定tab
   */
  useEffect(() => {
    if (!scrollContainer || !scrollContainer.current)
      return

    const index = tabs.findIndex(tab => tab.key === activeTabRoutePath)
    const currentTabElement = scrollContainer.current.querySelector(`#tab-${index}`)
    if (currentTabElement) {
      currentTabElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [activeTabRoutePath, tabs])

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
              <SortableContext items={tabs.map(i => i.key)} strategy={horizontalListSortingStrategy}>
                <DefaultTabBar {...tabBarProps}>
                  {node => (
                    <DraggableTabNode {...node.props} key={node.key}>
                      {node}
                    </DraggableTabNode>
                  )}
                </DefaultTabBar>
              </SortableContext>
            </DndContext>
          </div>
        )}
      />
    </StyledMultiTabs>
  )
}
