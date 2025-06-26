import { configureStore } from '@reduxjs/toolkit'
import resumeReducer from './slices/resumeSlice'

export const store = configureStore({
  reducer: {
    resume:resumeReducer
  },
})