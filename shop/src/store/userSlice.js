import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'UserName',
  age: 21
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      state.name = action.payload
    },
    increaseUserAge(state) {
      state.age++
    }
  }
})

export const { setName, increaseUserAge } = user.actions
export default user.reducer