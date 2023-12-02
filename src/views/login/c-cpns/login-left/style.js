import styled from 'styled-components'

export const LoginLeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;

  .top {
    display: flex;
    align-items: center;
    height: 50px;
    .logo {
      width: 30px;
      height: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .slogan {
      font-weight: 700;
      font-size: 16px;
    }
  }
  .center {
    flex: 1;
    padding: 20px 40px;
    /* .login-left-item {
      margin-top: 40%;
    } */
  }
  .bottom {
    font-size: 14px;
    text-align: center;
    height: 70px;
    line-height: 70px;
    .help {
      color: blue;
      cursor: pointer;
    }
  }
`
