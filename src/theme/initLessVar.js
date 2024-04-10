import { theme } from 'antd'
import { addPrefixToKeys } from '../utils/object.js'
import { customComponentConfig, customThemeTokenConfig } from './antd-theme.js'

const { getDesignToken, defaultAlgorithm, darkAlgorithm } = theme

// 去除主题色 把他注入到global的 less变量
// 主题色使用
// - var(--primary-color) var(--link-color)
// - 或者 antd.theme.useToken() colorPrimary
// -
function _getInitVaribles(theme) {
  const {
    colorPrimary: _colorPrimary,
    colorPrimaryBg: _colorPrimaryBg,
    colorPrimaryBgHover: _colorPrimaryBgHover,
    colorPrimaryBorder: _colorPrimaryBorder,
    colorPrimaryBorderHover: _colorPrimaryBorderHover,
    colorPrimaryHover: _colorPrimaryHover,
    colorPrimaryActive: _colorPrimaryActive,
    colorPrimaryTextHover: _colorPrimaryTextHover,
    colorPrimaryText: _colorPrimaryText,
    colorPrimaryTextActive: _colorPrimaryTextActive,
    ...defaultVaribles
  } = getDesignToken({
    token: { ...customThemeTokenConfig },
    components: {
      ...customComponentConfig,
    },
    algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
  })
  return defaultVaribles
}

const defaultVaribles = _getInitVaribles('light')
const darkDefaultVaribles = _getInitVaribles('dark')
const darkVaribles = addPrefixToKeys(darkDefaultVaribles, 'dark-')

const initGlobalLessVaribles = {
  ...defaultVaribles,
  ...darkVaribles,
  'namespace': 'ims',
  'white': '#fff',
  'content-bg': '#f4f7f9',
  'success-color': customThemeTokenConfig.colorSuccess,
  'warning-color': customThemeTokenConfig.colorWarning,
  'error-color': customThemeTokenConfig.colorError,
  'info-color': customThemeTokenConfig.colorInfo,
  'success-background-color': '#f5fff5',
  'warning-background-color': '#fff5e8',
  'error-background-color': '#fff6f5',
  'info-background-color': 'f5f8ff',
}

export { initGlobalLessVaribles }
