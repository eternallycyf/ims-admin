import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, theme } from 'antd'
import 'antd/dist/reset.css'

import {
  colorPrimarys,
  customComponentConfig,
  customThemeTokenConfig,
  themeModeToken,
} from '@/theme/antd-theme'
import useLocale from '@/locales/useLocale'
import { useSettings } from '@/store/settingStore'

import { ThemeMode } from '#/enum'

interface Props {
  children?: React.ReactNode
}

export default function AntdConfig({ children }: Props) {
  const { themeMode, themeColorPresets, componentSize } = useSettings()

  const { language } = useLocale()

  const algorithm = themeMode === ThemeMode.Light ? theme.defaultAlgorithm : theme.darkAlgorithm
  const colorPrimary = colorPrimarys[themeColorPresets]

  return (
    <ConfigProvider
      componentSize={componentSize}
      locale={language.antdLocal}
      theme={{
        token: { colorPrimary, ...customThemeTokenConfig, ...themeModeToken[themeMode].token },
        components: { ...customComponentConfig, ...themeModeToken[themeMode].components },
        algorithm,
      }}
    >
      {/* https://ant.design/docs/react/compatible-style-cn#styleprovider */}
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  )
}
