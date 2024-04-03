import { Alert, Button, Space } from 'antd'
import SettingButton from '@/layout/core/setting-button'
import './index.less'

interface LayoutProps {}

function Layout(_props: LayoutProps) {
  return (
    <>
      <Space>
        <div className="asdasdad">sds</div>
        <Button type="primary">123</Button>
        <Alert type="success" message="咋撒打算jasdas"></Alert>
        <Alert type="error" message="咋撒打算jasdas"></Alert>
        <Alert type="warning" message="咋撒打算jasdas"></Alert>
        <Alert type="info" message="咋撒打算jasdas"></Alert>
        <SettingButton />
      </Space>
    </>
  )
}

export default Layout
