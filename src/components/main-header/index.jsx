import React, { memo } from 'react'
import { MainHeaderWrapper } from './style'
import { Dropdown, Avatar } from 'antd'
import { localCache } from '@/utils/cache'
import { useNavigate } from 'react-router-dom'

const labelStyle = {
  padding: '0 20px'
}
const items = [
  {
    key: '1',
    disabled: true,
    label: <div style={labelStyle}>陈哈哈</div>
  },
  // {
  //   key: '2',
  //   label: <div style={labelStyle}>个人中心</div>
  // },
  {
    key: '3',
    label: <div style={labelStyle}>退出登录</div>
  }
]

const MainHeader = memo(() => {
  const navigate = useNavigate()
  const handleItemClick = ({ key }) => {
    if (key === '3') {
      localCache.setCache('token', '')
      navigate('/login')
    }
  }

  return (
    <MainHeaderWrapper>
      <Dropdown
        menu={{
          items,
          onClick: handleItemClick
        }}
        placement="bottom"
      >
        <div className="user">
          <Avatar size={50} className="avatar">
            U
          </Avatar>
          <div className="role">超级管理员</div>
        </div>
      </Dropdown>
    </MainHeaderWrapper>
  )
})

export default MainHeader
