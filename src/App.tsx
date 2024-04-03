import { App as AntdApp } from 'antd'
import Layout from './layout'
import { MotionLazy } from '@/components/animate/motion-lazy'
import AntdConfig from '@/components/Application/Antd'

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Layout />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  )
}

export default App
