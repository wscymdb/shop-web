import React, { memo } from 'react'
import { NotFoundWrapper } from './style'
import { useNavigate } from 'react-router-dom'

const NotFound = memo(() => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/')
  }
  return (
    <NotFoundWrapper>
      <div className="stars">
        <div className="custom-navbar">
          {/* <div className="brand-logo">
            <img
              alt=""
              src={require('@/assets/image/logo.svg').default}
              width="80px"
            />
          </div> */}
          {/* <div className="navbar-links">
            <ul>
              <li>
                <a href="#" target="_blank">
                  主页
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  选项一
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  选项二
                </a>
              </li>
              <li>
                <a href="#" className="btn-request" target="_blank">
                  选项三
                </a>
              </li>
            </ul>
          </div> */}
        </div>
        <div className="central-body">
          <img
            alt=""
            className="image-404"
            src={require('@/assets/image/404.svg').default}
            width="300px"
          />
          <div className="btn-go-home" onClick={goHome}>
            返回主页
          </div>
        </div>
        <div className="objects">
          <img
            alt=""
            className="object_rocket"
            src="./images/rocket.svg"
            width="40px"
          />
          <div className="earth-moon">
            <img
              alt=""
              className="object_moon"
              src={require('@/assets/image/moon.svg').default}
              width="80px"
            />
          </div>
          <div className="box_astronaut">
            <img
              alt=""
              className="object_astronaut"
              src={require('@/assets/image/astronaut.svg').default}
              width="140px"
            />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </NotFoundWrapper>
  )
})

export default NotFound
