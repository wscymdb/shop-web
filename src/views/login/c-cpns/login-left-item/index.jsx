import React, { memo, useCallback } from 'react'
import { LoginLeftItemWrapper } from './style'
import { Button, Form, Input } from 'antd'

const LoginLeftItem = memo(() => {
  const handleLogin = useCallback(function () {
    console.log(123)
  }, [])
  return (
    <LoginLeftItemWrapper>
      <div className="title">CMS后台管理系统</div>
      <div className="content">
        <Form name="basic" autoComplete="off">
          <Form.Item
            validateTrigger="onBlur"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username!'
              }
            ]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </div>
      <div className="action">
        <Button className="ym-button" block onClick={handleLogin}>
          登陆
        </Button>
      </div>
    </LoginLeftItemWrapper>
  )
})

export default LoginLeftItem
