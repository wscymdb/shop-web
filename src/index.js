import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { message } from 'antd'
import App from './App'
import Loading from './views/loding'

window.$msg = message

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Suspense fallback={<Loading />}>
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>
)
