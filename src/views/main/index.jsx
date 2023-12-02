import React, { memo } from 'react'

import { Layout } from 'antd'
import { MainWrapper } from './style'
import MainSider from '../../components/main-sider'
import MainHeader from '../../components/main-header'
import { Outlet } from 'react-router-dom'
const { Header, Sider, Content } = Layout

const Main = memo(() => {
  return (
    <MainWrapper>
      <Layout className="layout">
        <Sider className="sider">
          <MainSider />
        </Sider>
        <Layout>
          <Header className="header">
            <MainHeader />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </MainWrapper>
  )
})

export default Main
