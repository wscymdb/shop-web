import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './feature/login'

const store = configureStore({
  reducer: {
    login: loginReducer
  }
})

export default store
