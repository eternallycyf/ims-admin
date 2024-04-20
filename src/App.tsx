import { App as AntdApp } from 'antd'
import { MotionLazy } from '@/components'
import { AntdConfig } from '@/Application'
import Router from '@/router'

function App() {
  return (
    <AntdConfig>

      <AntdApp className="antd-app h-full w-full">
        <MotionLazy>
          <Router />
        </MotionLazy>
      </AntdApp>

    </AntdConfig>
  )
}

export default App
