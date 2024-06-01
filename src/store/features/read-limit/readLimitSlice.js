import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  total: 5,
  ids: []
}

export const readLimit = createSlice({
  name: 'readLimit',
  initialState,
  reducers: {
    decrementLimitById: (state, action) => {
      if (state.total > 0) {
        const haveRead = state.ids.some(id => +id === +action.payload.id);
        if (!haveRead) {
          state.ids.push(+action.payload.id);
          state.total -= 1          
        }
      }
    },
  },
})

export const { decrementLimitById } = readLimit.actions
export const selectReadLimit = (state) => state.readLimit;
export default readLimit.reducer