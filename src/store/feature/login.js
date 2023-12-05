import { createSlice } from '@reduxjs/toolkit'
import { localCache } from '../../utils/cache'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: {}
  },
  reducers: {
    setUserInfoAction(state, { payload }) {
      console.log(payload)
      state.user = payload
      localCache.setCache('token', payload.token)
    }
  }
})
export const { setUserInfoAction } = loginSlice.actions
export default loginSlice.reducer
