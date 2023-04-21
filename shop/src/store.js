import { configureStore, createSlice } from '@reduxjs/toolkit'

let userName = createSlice({
  name : 'userName',
  initialState : 'BaeJunbeom',
  reducers : {
    setUserName(state, action) {
      console.log('old user name : ' + state)
      let newUserName = action.payload;
      console.log('new user name : ' + newUserName)
      return newUserName
    }
  }
})

export let { setUserName } = userName.actions

let inventory = createSlice({
  name : 'inventory',
  initialState : [10, 11, 12]
})

let cartItems = createSlice({
  name : 'cartItems',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    increaseCount(state, action) {
      let targetItemId = action.payload;
      let targetItem = state.find(x => x.id === targetItemId);
      
      if (targetItem != null) {
        targetItem.count = targetItem.count + 1
        return state
      }
    },
    decreaseCount(state, action) {
      let targetItemId = action.payload;
      let targetItem = state.find(x => x.id === targetItemId);

      if (targetItem != null) {
        if (targetItem.count != 0) targetItem.count = targetItem.count - 1
        return state
      }
    }
  }
})

export let { increaseCount, decreaseCount } = cartItems.actions

export default configureStore({
  reducer: {
    userName : userName.reducer,
    inventory : inventory.reducer,
    cartItems : cartItems.reducer
  }
}) 