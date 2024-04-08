import { type CSSProperties, forwardRef } from 'react'
import { Outlet } from 'react-router-dom'

import { useSettings } from '@/store/settingStore'

import { MultiTabs } from '@/layouts/core'

interface Props {

}

const Content: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (_props, ref) => {
  const { multiTab } = useSettings()

  const mainStyle: CSSProperties = {
    transition: 'padding 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  }

  return (
    <article
      ref={ref}
      style={mainStyle}
      className="h-full w-full flex flex-1 overflow-x-auto"
    >
      {multiTab ? <MultiTabs /> : <Outlet />}
    </article>
  )
}

export default forwardRef(Content)
