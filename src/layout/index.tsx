import Switch from '@/theme/Switch'

import './index.less'

interface LayoutProps {}

function Layout(_props: LayoutProps) {
  return (
    <>
      <Switch />
      <div className="h-50 overflow-hidden overflow-scroll">
        <div className="a1">1</div>
        <div className="a2">2</div>
        <div className="a3">3</div>
        <div className="a4">4</div>
        <div className="a5">5</div>
        <div className="a6">6</div>
        <div className="a7">7</div>
        <div className="a8">8</div>
        <div className="a9">9</div>
        <div className="a10">10</div>
        <div className="custom">123</div>
      </div>
    </>
  )
}

export default Layout
