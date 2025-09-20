import { configureStore } from '@reduxjs/toolkit'
import AdminReducer from './authSlice'

export const store = configureStore({
  reducer: {
    admin: AdminReducer
  },
})