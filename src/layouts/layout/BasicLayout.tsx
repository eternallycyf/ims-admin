import { Suspense } from 'react'

import Color from 'color'
import ProgressBar from '@/components/ProgressBar'
import { Content, Header, Menu, MenuHorizontal } from '@/layouts/core'
import { useSettings } from '@/store/settingStore'

import { ThemeLayout } from '#/enum'
import { useThemeToken } from '@/hooks/theme'
import { CircleLoading } from '@/components'

function DashboardLayout() {
  const { colorBgElevated, colorTextBase, colorBorder } = useThemeToken()
  const { themeLayout } = useSettings()

  const navVertical = (
    <div className="z-50 hidden h-full flex-shrink-0 md:block">
      <Menu />
    </div>
  )

  const border = `1px dashed ${Color(colorBorder).alpha(0.6).toString()}`

  const menu = themeLayout === ThemeLayout.Horizontal ? <MenuHorizontal /> : navVertical

  return (
    <section h-full w-full>
      <ProgressBar />

      <section
        className="h-full w-full flex flex-col overflow-hidden"
        style={{
          color: colorTextBase,
          background: colorBgElevated,
          transition:
            'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        }}
      >
        <Suspense fallback={<CircleLoading />}>
          <Header />
          <main className={`flex-start overflow-y-auto h-full w-full flex flex-1 ${themeLayout === 'horizontal' && 'flex-col'}`}>
            <aside style={{ flex: 'unset', borderBottom: themeLayout === ThemeLayout.Horizontal ? border : 'none' }}>
              { menu }
            </aside>
            <Content />
          </main>
        </Suspense>
      </section>
    </section>
  )
}

export default DashboardLayout
