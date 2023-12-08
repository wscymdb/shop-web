import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { ConfigProvider, message } from 'antd'
import App from './App'
import Loading from './views/loding'
import { Provider } from 'react-redux'
import store from '@/store'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'

window.$msg = message

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Suspense fallback={<Loading />}>
    <HashRouter>
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </HashRouter>
  </Suspense>
)
