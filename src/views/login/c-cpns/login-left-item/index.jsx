import React, { memo } from 'react'
import { LoginLeftItemWrapper } from './style'
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { setUserInfoAction } from '@/store/feature/login'
import * as http from '@/services/modules/login'
import { useNavigate } from 'react-router-dom'

const LoginLeftItem = memo(() => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleFinish = async (v) => {
    try {
      const { data } = await http.login({ ...v })
      if (!data) return
      dispatch(setUserInfoAction(data))
      navigate('/main')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginLeftItemWrapper>
      <div className="title">CMS后台管理系统</div>
      <div className="content">
        <Form
          name="basic"
          autoComplete="off"
          form={form}
          onFinish={handleFinish}
        >
          <Form.Item
            validateTrigger="onBlur"
            name="name"
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
        <Button className="ym-button" block onClick={(e) => form.submit()}>
          登陆
        </Button>
      </div>
    </LoginLeftItemWrapper>
  )
})

export default LoginLeftItem
