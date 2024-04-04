import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import Color from 'color'
import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { useLocation, useMatches, useNavigate } from 'react-router-dom'

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config'
import Scrollbar from '@/components/scrollbar'
import { menuFilter } from '@/router/utils'
import { useSettingActions, useSettings } from '@/store/settingStore'

import { ThemeLayout } from '#/enum'
import { useThemeToken } from '@/hooks/theme'
import { useFlattenedRoutes, usePermissionRoutes, useRouteToMenuFn } from '@/hooks/router'
import { Logo } from '@/layouts/components'

interface Props {
  closeSideBarDrawer?: () => void
}
export default function Nav(props: Props) {
  const navigate = useNavigate()
  const matches = useMatches()
  const { pathname } = useLocation()

  const { colorTextBase, colorBgElevated, colorBorder } = useThemeToken()

  const settings = useSettings()
  const { themeLayout } = settings
  const { setSettings } = useSettingActions()

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
  const [collapsed, setCollapsed] = useState(false)
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
      setCollapsed(false)
      setMenuMode('inline')
    }
    if (themeLayout === ThemeLayout.Mini) {
      setCollapsed(true)
      setMenuMode('inline')
    }
  }, [themeLayout])

  /**
   * events
   */
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    if (latestOpenKey)
      setOpenKeys(keys)
    else
      setOpenKeys([])
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

  const setThemeLayout = (themeLayout: ThemeLayout) => {
    setSettings({
      ...settings,
      themeLayout,
    })
  }

  const toggleCollapsed = () => {
    if (!collapsed)
      setThemeLayout(ThemeLayout.Mini)
    else
      setThemeLayout(ThemeLayout.Vertical)

    setCollapsed(!collapsed)
  }

  return (
    <div
      className="h-full flex flex-col"
      style={{
        width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH,
        borderRight: `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`,
      }}
    >
      <div className="relative h-20 flex items-center justify-center py-4">
        {themeLayout === ThemeLayout.Mini
          ? (
            <Logo className="text-lg" />
            )
          : (
            <Logo className="text-4xl" />
            )}
        <button
          onClick={toggleCollapsed}
          className="absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center md:block !text-gray"
          style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined size={20} /> : <MenuFoldOutlined size={20} />}
        </button>
      </div>

      <Scrollbar
        style={{
          height: 'calc(100vh - 70px)',
        }}
      >
        {/* <!-- Sidebar Menu --> */}
        <Menu
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
