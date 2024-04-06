import { App as AntdApp } from 'antd'
import MotionLazy from '@/components/animate/motion-lazy'
import { AntdConfig, AppProvider } from '@/Application'
import Router from '@/router'

function App() {
  return (
    <AntdConfig>
      <AppProvider prefixCls={import.meta.env.VITE_PREFIXCLS}>
        <AntdApp>
          <MotionLazy>
            <Router />
          </MotionLazy>
        </AntdApp>
      </AppProvider>
    </AntdConfig>
  )
}

export default App
