import styled from 'styled-components'

export const ProductWrapper = styled.div`
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  .basic {
    padding: 16px;
    background-color: #fff;
    border-radius: 8px;
  }
  .query {
    margin-bottom: 10px;
  }
  .table {
    flex: 1;
    overflow: hidden;
    .actions {
      margin-bottom: 15px;
    }
  }
`
