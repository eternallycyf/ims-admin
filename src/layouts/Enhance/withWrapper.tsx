import React, { useEffect } from 'react'
import { ThemeLayout } from '#/enum'
import { useSettingActions, useSettings } from '@/store/settingStore'
import { CircleLoading } from '@/components'

function withWrapper<P>(Component: React.ComponentType<P>): React.FC<P> {
  return function ResultComponent(props: P) {
    const [loading, setLoading] = React.useState(false)
    const { themeLayout, collapsed } = useSettings()
    const { setSettings } = useSettingActions()

    useEffect(() => {
      setLoading(true)
      if (themeLayout === ThemeLayout.Vertical)
        setSettings({ collapsed: false })

      if (themeLayout === ThemeLayout.Mini)
        setSettings({ collapsed: true })

      setLoading(false)
    }, [themeLayout])

    return loading ? <CircleLoading /> : <Component {...(props)} themeLayout={themeLayout} collapsed={collapsed} />
  }
}

export default withWrapper
