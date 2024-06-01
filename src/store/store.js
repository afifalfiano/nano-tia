import { configureStore } from '@reduxjs/toolkit'
import readLimit from './features/read-limit/readLimitSlice';

export const store = configureStore({
  reducer: {
    readLimit: readLimit,
  },
})