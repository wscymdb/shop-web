import React from 'react'
import { Navigate } from 'react-router-dom'
const Main = React.lazy(() => import('@/views/main'))
const routes = [
  {
    path: '/',
    element: <Navigate to="/main" />,
  },
  {
    path: '/main',
    element: <Main />,
  },
]
export default routes
