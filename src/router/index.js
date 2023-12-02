import React from 'react'
import { Navigate } from 'react-router-dom'
const Main = React.lazy(() => import('@/views/main'))
const Product = React.lazy(() => import('@/views/product'))
const routes = [
  {
    path: '/',
    element: <Navigate to="/main" />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main',
        element: <Navigate to="/main/product" />,
      },
      {
        path: '/main/product',
        element: <Product />,
      },
    ],
  },
]
export default routes
