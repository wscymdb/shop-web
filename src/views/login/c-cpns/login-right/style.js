import styled from 'styled-components'

export const LoginRightWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  &::before {
    content: '';
    display: table;
  }
  .video {
    margin-top: 50%;
    transform: translateY(-50%);
    overflow: hidden;
  }
`
