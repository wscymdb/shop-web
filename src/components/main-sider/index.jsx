import React, { memo, useState } from 'react'
import { MainSiderWrapper } from './style'

import { FileProtectOutlined, PieChartOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  getItem('个人中心', '1', <PieChartOutlined />),

  getItem('商品管理', 'sub1', <FileProtectOutlined />, [
    getItem('商品列表', '5'),
  ]),
]

const MainSider = memo(() => {
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
          defaultSelectedKeys={['5']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          items={items}
        />
      </div>
    </MainSiderWrapper>
  )
})

export default MainSider
