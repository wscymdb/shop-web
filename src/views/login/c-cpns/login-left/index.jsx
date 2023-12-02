import React, { memo } from 'react'
import LoginLeftItem from '../login-left-item'
import { LoginLeftWrapper } from './style'

import { notification } from 'antd'

const LoginLeft = memo(() => {
  const callAdmin = () => {
    notification.open({
      message: '提示',
      description: '管理员不在😁'
    })
  }
  return (
    <LoginLeftWrapper>
      <div className="top">
        <div className="logo">
          <img src={require('@/assets/image/logo.png')} alt="" />
        </div>
        <div className="slogan">welcome to cms</div>
      </div>
      <div className="center">
        <LoginLeftItem></LoginLeftItem>
      </div>
      <div className="bottom">
        还没有账户吗？
        <span className="help" onClick={callAdmin}>
          联系管理员
        </span>
      </div>
    </LoginLeftWrapper>
  )
})

export default LoginLeft
