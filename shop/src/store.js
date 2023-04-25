import { configureStore, createSlice } from '@reduxjs/toolkit'
import userReducer from './store/userSlice.js'
import cartItems from './store/cartItemsSlice.js'

export default configureStore({
  reducer: {
    user : userReducer,
    cartItems : cartItems.reducer
  }
}) 