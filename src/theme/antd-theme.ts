import type { ThemeConfig } from 'antd'

import type { ThemeColorPresets } from '#/enum'
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customThemeTokenConfig: ThemeConfig['token'] = {
  colorSuccess: '#11bb43',
  colorWarning: '#fa6a0a',
  colorError: '#e62c3b',
  colorInfo: '#00b8d9',
  colorLinkHover: '#4d7fe3',
  colorLinkActive: '#1b45b8',
  // 线性化
  wireframe: false,

  borderRadiusSM: 2,
  borderRadius: 4,
  borderRadiusLG: 8,
}

const customComponentConfig: ThemeConfig['components'] = {
  Breadcrumb: {
    fontSize: 12,
    separatorMargin: 4,
  },
  Menu: {
    fontSize: 14,
    colorFillAlter: 'transparent',
    itemColor: 'rgb(145, 158, 171)',
  },
}

const colorPrimarys: {
  [k in ThemeColorPresets]: string;
} = {
  default: '#00CA88',
  cyan: '#078DEE',
  purple: '#7635DC',
  blue: '#2065D1',
  orange: '#FDA92D',
  red: '#FF3030',
}

const themeModeToken: Record<'dark' | 'light', ThemeConfig> = {
  dark: {
    token: {
      colorBgLayout: '#161c24',
      colorBgContainer: '#212b36',
      colorBgElevated: '#161c24',
    },
    components: {
      Modal: {
        headerBg: '#212b36',
        contentBg: '#212b36',
        footerBg: '#212b36',
      },
      Notification: {},
    },
  },
  light: {},
}

export { customThemeTokenConfig, customComponentConfig, colorPrimarys, themeModeToken }
