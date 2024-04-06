import { Drawer, Space } from 'antd'
import Color from 'color'
import type { CSSProperties } from 'react'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Iconify from '@/components/icon/IconifyIcon'
import SvgIcon from '@/components/icon/SvgIcon'
import IconButton from '@/components/icon/IconButton'
import { HEADER_HEIGHT, NAV_COLLAPSED_WIDTH, NAV_WIDTH, OFFSET_HEADER_HEIGHT } from '@/layouts/helpers/config'
import { AccountDropdown, BreadCrumb, LocalePicker, Logo, Menu, Notice, SearchBar, SettingButton } from '@/layouts/core'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { ThemeLayout } from '#/enum'
import { useResponsive, useThemeToken } from '@/hooks/theme'

interface Props {
  className?: string
  offsetTop?: boolean
}

export default function Header({ className = '', offsetTop = false }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { themeLayout, breadCrumb } = useSettings()
  const { colorTextBase, colorBgElevated, colorBorder } = useThemeToken()
  const { screenMap } = useResponsive()
  const { collapsed } = useSettings()
  const { setSettings } = useSettingActions()

  const toggleCollapsed = () => {
    if (!collapsed)
      setSettings({ themeLayout: ThemeLayout.Mini })
    else
      setSettings({ themeLayout: ThemeLayout.Vertical })

    setSettings({ collapsed: !collapsed })
  }

  const headerStyle: CSSProperties = {
    position: themeLayout === ThemeLayout.Horizontal ? 'relative' : 'fixed',
    borderBottom:
      themeLayout === ThemeLayout.Horizontal
        ? `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`
        : '',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  }

  if (themeLayout === ThemeLayout.Horizontal) {
    headerStyle.width = '100vw'
  }
  else if (screenMap.md) {
    headerStyle.right = '0px'
    headerStyle.left = 'auto'
    headerStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    }px)`
  }
  else {
    headerStyle.width = '100vw'
  }

  return (
    <>
      <header className={`z-20 w-full ${className}`} style={headerStyle}>
        <div
          className="2xl:px-10 flex flex-grow items-center justify-between px-4 text-gray backdrop-blur xl:px-6"
          style={{
            height: offsetTop ? OFFSET_HEADER_HEIGHT : HEADER_HEIGHT,
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          }}
        >
          <div className="flex items-center">
            {themeLayout !== ThemeLayout.Horizontal
              ? (
                <IconButton onClick={() => setDrawerOpen(true)} className="h-10 w-10 md:hidden">
                  <SvgIcon icon="ic-menu" size="24" />
                </IconButton>
                )
              : (
                <Logo className="mr-2 text-xl" />
                )}
            {themeLayout !== ThemeLayout?.Horizontal
              ? (
                <Space className="hidden sm:block">
                  <button
                    onClick={toggleCollapsed}
                    className="hidden cursor-pointer select-none rounded-full text-center sm:inline !text-gray"
                    style={{ color: colorTextBase, borderColor: colorTextBase, fontSize: 16 }}
                  >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  </button>
                  {breadCrumb ? <BreadCrumb /> : null}
                </Space>
                )
              : (
                <>
                  {breadCrumb ? <BreadCrumb /> : null}
                </>
                )}
          </div>

          <div className="flex">
            <SearchBar />
            <LocalePicker />
            <IconButton onClick={() => window.open(`https://github.com/eternallycyf/${import.meta.env.VITE_GLOB_APP_TITLE}`)}>
              <Iconify icon="mdi:github" size={24} />
            </IconButton>
            <Notice />
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>
      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closeIcon={false}
        styles={{
          header: { display: 'none' },
          body: {
            padding: 0,
            overflow: 'hidden',
          },
        }}
        width="auto"
      >
        <Menu closeSideBarDrawer={() => setDrawerOpen(false)} />
      </Drawer>
    </>
  )
}
