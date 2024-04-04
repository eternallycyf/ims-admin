import { App as AntdApp } from 'antd'
import { MotionLazy } from '@/components/animate/motion-lazy'
import { AntdConfig } from '@/Application'
import Router from '@/router'

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  )
}

export default App
