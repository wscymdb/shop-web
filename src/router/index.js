import React from 'react'
import { Navigate } from 'react-router-dom'

import NotFound from '@/views/404-not-found'

const Main = React.lazy(() => import('@/views/main'))
const Product = React.lazy(() => import('@/views/product'))
const Label = React.lazy(() => import('@/views/label'))
const Login = React.lazy(() => import('@/views/login'))

const routes = [
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main',
        element: <Navigate to="/main/product" />,
        auth: true
      },
      {
        path: '/main/product',
        element: <Product />,
        auth: true
      },
      {
        path: '/main/lable',
        element: <Label />,
        auth: true
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]
export default routes
