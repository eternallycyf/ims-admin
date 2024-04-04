import { Content } from 'antd/es/layout/layout'
import { type CSSProperties, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { HEADER_HEIGHT, MULTI_TABS_HEIGHT, MultiTabs, NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './'
import { useSettings } from '@/store/settingStore'

import { ThemeLayout } from '#/enum'
import { useResponsive } from '@/hooks/theme'

interface Props {
  offsetTop?: boolean
}
const Main: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (props, ref) => {
  // eslint-disable-next-line react/prop-types
  const { offsetTop = false } = props
  const { themeStretch, themeLayout, multiTab } = useSettings()
  const { screenMap } = useResponsive()

  const mainStyle: CSSProperties = {
    paddingTop: HEADER_HEIGHT + (multiTab ? MULTI_TABS_HEIGHT : 0),
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    width: '100%',
  }
  if (themeLayout === ThemeLayout.Horizontal) {
    mainStyle.width = '100vw'
    mainStyle.paddingTop = multiTab ? MULTI_TABS_HEIGHT : 0
  }
  else if (screenMap.md) {
    mainStyle.width = `calc(100% - ${
      themeLayout === ThemeLayout.Vertical ? NAV_WIDTH : NAV_COLLAPSED_WIDTH
    })`
  }
  else {
    mainStyle.width = '100vw'
  }

  return (
    <Content ref={ref} style={mainStyle} className="flex overflow-auto">
      <div
        className={`m-auto h-full w-full flex-grow sm:p-2 ${
          themeStretch ? '' : 'xl:max-w-screen-xl'
        }`}
      >
        {multiTab ? <MultiTabs offsetTop={offsetTop} /> : <Outlet />}
      </div>
    </Content>
  )
}

export default forwardRef(Main)
