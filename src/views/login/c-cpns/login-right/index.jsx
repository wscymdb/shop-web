import React, { memo } from 'react'
import { LoginRightWrapper } from './style'

const LoginRight = memo(() => {
  return (
    <LoginRightWrapper>
      <div className="video">
        <video
          src={require('@/assets/video/jg.mp4')}
          autoPlay
          muted
          loop
        ></video>
      </div>
    </LoginRightWrapper>
  )
})

export default LoginRight
