import { Drawer, Space } from 'antd';
import Color from 'color';
import type { CSSProperties } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { IconButton, IconifyIcon } from '@/components';
import {
  AccountDropdown,
  BreadCrumb,
  LocalePicker,
  Logo,
  Menu,
  Notice,
  SearchBar,
  SettingButton,
} from '@/layouts/core';
import { useSettingActions, useSettings } from '@/store/settingStore';
import { ThemeLayout } from '#/enum';
import { useResponsive, useThemeToken } from '@/hooks/theme';
import {
  HEADER_HEIGHT,
  MENU_COLLAPSED_WIDTH,
  MENU_WIDTH,
} from '@/layouts/helpers/config';

interface Props {
  className?: string;
}

export default function Header({ className = '' }: Props) {
  const { themeLayout, menuDrawOpen, breadCrumb, multiTab, collapsed } =
    useSettings();
  const { colorBgElevated, colorBorder, colorTextBase } = useThemeToken();
  const { screenMap } = useResponsive();
  const { setSettings } = useSettingActions();

  const border = `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`;

  const headerStyle: CSSProperties = {
    borderBottom: themeLayout === ThemeLayout.Horizontal ? border : 'none',
    backgroundColor: Color(colorBgElevated).alpha(1).toString(),
  };

  const toggleCollapsed = () => {
    if (!screenMap?.md) {
      setSettings({
        menuDrawOpen: !menuDrawOpen,
        collapsed: themeLayout === ThemeLayout.Mini,
      });
    } else {
      if (!collapsed) setSettings({ themeLayout: ThemeLayout.Mini });
      else setSettings({ themeLayout: ThemeLayout.Vertical });

      setSettings({ collapsed: !collapsed });
    }
  };

  return (
    <>
      <header
        className={`overflow-hidden flex ${className}`}
        style={{
          ...headerStyle,
          borderBottom: !multiTab ? border : 'none',
          flex: 'unset',
          transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        {!screenMap.md && !multiTab && (
          <button
            onClick={toggleCollapsed}
            className="m-l-[5px] cursor-pointer select-none rounded-full text-center !text-gray"
            style={{
              color: colorTextBase,
              borderColor: colorTextBase,
              fontSize: 16,
              display:
                themeLayout !== ThemeLayout.Horizontal
                  ? 'inline-block'
                  : 'none',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        )}

        <div
          style={{
            flex: 'unset',
            width: collapsed ? MENU_COLLAPSED_WIDTH - 1 : MENU_WIDTH - 1,
            display: 'flex',
            justifyContent: collapsed || screenMap?.md ? 'center' : 'start',
            alignItems: 'center',
            paddingLeft: screenMap?.md ? 0 : 12,
          }}
        >
          <Logo
            className={`text-${collapsed || !screenMap?.md ? 'xl' : '4xl'}`}
          />
        </div>

        <div
          style={{
            borderLeft:
              screenMap?.md && themeLayout !== ThemeLayout.Horizontal
                ? border
                : 'none',
            height: HEADER_HEIGHT,
          }}
          className="flex-between flex-1 p-l-[12px] p-r-[10px]"
        >
          <div className="flex-center">
            <Space className="hidden sm:block">
              {breadCrumb && screenMap?.md ? <BreadCrumb /> : null}
            </Space>
          </div>

          <div className="flex-end flex-1">
            <SearchBar />
            <LocalePicker />
            <IconButton
              onClick={() =>
                window.open(
                  `https://github.com/eternallycyf/${import.meta.env.VITE_GLOB_APP_TITLE}`,
                )
              }
            >
              <IconifyIcon icon="mdi:github" size={24} />
            </IconButton>
            <Notice />
            <SettingButton />
            <AccountDropdown />
          </div>
        </div>
      </header>
      {breadCrumb && !screenMap?.md ? (
        <div
          className="flex-left p-b-[5px] p-l-[10px] p-r-[10px] p-t-[5px]"
          style={{ borderBottom: border }}
        >
          <BreadCrumb />
        </div>
      ) : null}
      <Drawer
        placement="left"
        onClose={() => setSettings({ menuDrawOpen: false })}
        open={menuDrawOpen}
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
        <Menu closeSideBarDrawer={() => setSettings({ menuDrawOpen: false })} />
      </Drawer>
    </>
  );
}
