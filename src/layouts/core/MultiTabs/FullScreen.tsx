import { Button } from 'antd'
import { useState } from 'react'
import screenfull from 'screenfull'
import { SvgIcon } from '@/components'
import { useThemeToken } from '@/hooks/theme'
import { t } from '@/locales/i18n'

function FullScreen() {
  const { colorPrimary } = useThemeToken()

  const [isFullscreen, setIsFullscreen] = useState<boolean>(screenfull.isFullscreen)
  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
      setIsFullscreen(!isFullscreen)
    }
  }

  return (
    <Button block={true} type="dashed" size="large" onClick={toggleFullScreen}>
      <div className="flex items-center justify-center">
        {isFullscreen
          ? (
            <>
              <SvgIcon icon="ic-settings-exit-fullscreen" color={colorPrimary} className="!m-0" />
              <span className="ml-2">
                {' '}
                {t('sys.setting.exit-full-screen')}
              </span>
            </>
            )
          : (
            <>
              <SvgIcon icon="ic-settings-fullscreen" className="!m-0" />
              <span className="ml-2 text-gray">
                {' '}
                {t('sys.setting.full-screen')}
              </span>
            </>
            )}
      </div>
    </Button>
  )
}

export default FullScreen
