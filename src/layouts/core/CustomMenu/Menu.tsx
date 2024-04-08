import type { MenuProps } from 'antd'
import { Menu as AntdMenu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import Color from 'color'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'

import { MENU_COLLAPSED_WIDTH, MENU_WIDTH } from '@/layouts/helpers/config'
import Scrollbar from '@/components/scrollbar'
import { menuFilter } from '@/router/utils'
import { useSettingActions, useSettings } from '@/store/settingStore'

import { ThemeLayout } from '#/enum'
import { useThemeToken } from '@/hooks/theme'
import { useFlattenedRoutes, usePermissionRoutes, useRouteToMenuFn } from '@/hooks/router'

interface Props {
  closeSideBarDrawer?: () => void
}

export default function Menu(props: Props) {
  const navigate = useNavigate()
  const matches = useMatches()
  const { pathname } = useLocation()

  const { colorBgElevated, colorBorder } = useThemeToken()

  const settings = useSettings()
  const { themeLayout } = settings
  const { setSettings } = useSettingActions()

  const { collapsed } = settings

  const menuStyle: CSSProperties = {
    background: colorBgElevated,
  }

  const routeToMenuFn = useRouteToMenuFn()
  const permissionRoutes = usePermissionRoutes()
  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes()

  /**
   * state
   */
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([''])
  const [menuList, setMenuList] = useState<ItemType[]>([])
  const [menuMode, setMenuMode] = useState<MenuProps['mode']>('inline')

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      const openKeys = matches
        .filter(match => match.pathname !== '/')
        .map(match => match.pathname)
      setOpenKeys(openKeys)
    }
    setSelectedKeys([pathname])
  }, [pathname, matches, collapsed, themeLayout])

  useEffect(() => {
    const menuRoutes = menuFilter(permissionRoutes)
    const menus = routeToMenuFn(menuRoutes)
    setMenuList(menus)
  }, [permissionRoutes, routeToMenuFn])

  useEffect(() => {
    if (themeLayout === ThemeLayout.Vertical) {
      setSettings({ collapsed: false })
      setMenuMode('inline')
    }
    if (themeLayout === ThemeLayout.Mini) {
      setSettings({ collapsed: true })
      setMenuMode('inline')
    }
  }, [themeLayout])

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys)
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    // 从扁平化的路由信息里面匹配当前点击的那个
    const nextLink = flattenedRoutes?.find(el => el.key === key)

    // 处理菜单项中，外链的特殊情况
    // 点击外链时，不跳转路由，不在当前项目添加tab，不选中当前路由，新开一个 tab 打开外链
    if (nextLink?.hideTab && nextLink?.frameSrc) {
      window.open(nextLink?.frameSrc, '_blank')
      return
    }

    navigate(key)
    props?.closeSideBarDrawer?.()
  }

  return (
    <div
      className="h-full flex flex-col"
      style={{
        width: collapsed ? MENU_COLLAPSED_WIDTH : MENU_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <Scrollbar
        style={{
          height: 'calc(100vh - 70px)',
        }}
      >
        {/* <!-- Sidebar Menu --> */}
        <AntdMenu
          mode={menuMode}
          items={menuList}
          className="h-full !border-none"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectedKeys}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
          style={menuStyle}
          inlineCollapsed={collapsed}
        />
      </Scrollbar>
    </div>
  )
}
