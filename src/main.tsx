import './index.css'
import '../public/style/index.css'
import './style/index.less'
import 'virtual:uno.css'
import 'dayjs/locale/zh-cn'

import React from 'react'
import ReactDOM from 'react-dom/client'

import Layout from './layout'
import { AppProvider } from './components/Application/AppProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider prefixCls="ims">
      <Layout />
    </AppProvider>
  </React.StrictMode>,
)
