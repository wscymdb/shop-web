import React, { memo, useState } from 'react'
import { MainSiderWrapper } from './style'

import { FileProtectOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

const items = [
  getItem('个人中心', '1', <PieChartOutlined />),

  getItem('商品管理', 'sub1', <FileProtectOutlined />, [
    getItem('商品列表', '2')
  ]),
  getItem('标签列表', '3', <PieChartOutlined />)
]

const MainSider = memo(() => {
  const navigate = useNavigate()
  const handleClick = ({ key }) => {
    // console.log(payload)
    switch (key) {
      case '2':
        navigate('/main/product')
        break
      case '3':
        navigate('/main/lable')
        break

      default:
        break
    }
  }
  return (
    <MainSiderWrapper>
      <div className="logo">
        <div className="pic">
          <img src={require('@/assets/image/logo.png')} alt="" />
        </div>
        <h1 className="name">RMC平台</h1>
      </div>
      <div className="menus">
        <Menu
          defaultSelectedKeys={['2']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={items}
          onClick={handleClick}
        />
      </div>
    </MainSiderWrapper>
  )
})

export default MainSider
