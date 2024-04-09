import { App as AntdApp } from 'antd'
import { MotionLazy } from '@/components'
import { AntdConfig, AppProvider } from '@/Application'
import Router from '@/router'

function App() {
  return (
    <AntdConfig>
      <AppProvider prefixCls={import.meta.env.VITE_PREFIXCLS}>
        <AntdApp className="antd-app h-full w-full">
          <MotionLazy>
            <Router />
          </MotionLazy>
        </AntdApp>
      </AppProvider>
    </AntdConfig>
  )
}

export default App
