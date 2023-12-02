import React, { memo } from 'react'
import { LoginWrapper } from './style'
import LoginLeft from './c-cpns/login-left'
import LoginRight from './c-cpns/login-right'

const Login = memo(() => {
  return (
    <LoginWrapper>
      <div className="left">
        <LoginLeft></LoginLeft>
      </div>
      <div className="right">
        <LoginRight></LoginRight>
      </div>
    </LoginWrapper>
  )
})

export default Login
