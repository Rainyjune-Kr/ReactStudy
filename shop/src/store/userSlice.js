import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Bae Junbeom',
  age: 33
}

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName(state, action) {
      let newUserName = action.payload;
      let currUser = state;
      currUser.name = newUserName;
    },
    increaseUserAge(state) {
      state.age = state.age + 1;
    }
  }
})

export const { setName, increaseUserAge } = user.actions
export default user.reducer