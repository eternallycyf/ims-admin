import { useEffect } from 'react'
import { generate } from '@ant-design/colors'
import { useThemeToken } from '@/hooks/theme'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { ThemeMode } from '#/enum'
import ToggleTheme2 from '@/layouts/core/GlobalHeader/ThemeModeBtn/ToggleTheme2'
import ToggleTheme1 from '@/layouts/core/GlobalHeader/ThemeModeBtn/ToggleTheme'
import useLocale from '@/locales/useLocale'

function ThemeModeBtn() {
  const { colorPrimary, colorTextBase, colorBorder } = useThemeToken()
  const { locale } = useLocale()

  const settings = useSettings()
  const { themeMode } = settings
  const { setSettings } = useSettingActions()
  const isDark = themeMode === ThemeMode.Dark

  useEffect(() => {
    const colors = generate(colorPrimary, {
      theme: isDark ? 'dark' : 'default',
      backgroundColor: isDark ? '#333' : '#fff',
    })
    const whiteColors = generate('#fff')

    const themeVariables = {
      'primary-color': colorPrimary,
      'primary-hover-color': isDark ? colors[6] : colors[4],
      'primary-active-color': isDark ? colors[4] : colors[6],
      'processing-color': colorPrimary,
      'link-color': colorPrimary,
      'text-color': colorTextBase,
      'border-color': colorBorder,
      'component-background-color': isDark ? '#151515' : '#fff',
      // 全屏样式
      'layout-body-background': isDark ? '#000' : '#f0f2f5',
      'white-hover': isDark ? whiteColors[6] : whiteColors[4],
      'white-active': isDark ? whiteColors[4] : whiteColors[6],
      'ims-bg': isDark ? '#333' : '#fff',
    }
    Object.entries(themeVariables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value as string)
    })
  }, [colorPrimary])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  if (locale === 'zh_CN') {
    return (
      <div style={{ zoom: 0.45 }}>
        <ToggleTheme1
          active={isDark}
          onClick={active => setSettings({
            themeMode: active ? ThemeMode.Dark : ThemeMode.Light,
          })}
        />
      </div>
    )
  }

  return (
    <div style={{ zoom: 0.25 }}>
      <ToggleTheme2
        active={isDark}
        onClick={active => setSettings({
          themeMode: active ? ThemeMode.Dark : ThemeMode.Light,
        })}
      />
    </div>
  )
}

export default ThemeModeBtn
