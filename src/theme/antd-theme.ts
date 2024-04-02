import type { ThemeConfig } from 'antd'

import type { ThemeColorPresets } from '@/types/enum'
/**
 * Antd theme editor: https://ant.design/theme-editor-cn
 */
const customThemeTokenConfig: ThemeConfig['token'] = {
  colorSuccess: '#11bb43',
  colorWarning: '#fa6a0a',
  colorError: '#e62c3b',
  colorInfo: '#00b8d9',

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
  default: '#2b5fdc',
  cyan: '#078DEE',
  purple: '#b974ff',
  blue: '#2b5fdc',
  orange: '#fa6a0a',
  red: '#e62c3b',
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
