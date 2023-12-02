import styled from 'styled-components'

export const MainHeaderWrapper = styled.div`
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;

  .user {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 10px;

    cursor: pointer;

    .role {
      font-size: 12px;
    }
  }
`
