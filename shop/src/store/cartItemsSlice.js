import { createSlice } from '@reduxjs/toolkit'

let cartItems = createSlice({
  name: 'cartItems',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 2, name: 'Grey Yordan', count: 1 }
  ],
  reducers: {
    increaseCount(state, action) {
      let targetItem = state.find((x) => { return x.id === action.payload })

      if (targetItem != null) {
        targetItem.count++
      }
    },
    decreaseCount(state, action) {
      let targetItem = state.find((x) => { return x.id === action.payload })

      if (targetItem !== null && targetItem.count > 0) {
        targetItem.count--
      }
    },
    addCart(state, action) {
      let existCheck = state.find((x) => { return x.id === action.payload.id })
      
      if (existCheck !== null && typeof existCheck !== 'undefined') {
        existCheck.count++
      }
      else {
        state.push(action.payload)
      }
    },
    removeFromCart(state, action) {
      let existCheck = state.find((x) => { return x.id === action.payload })

      if (existCheck !== null && typeof existCheck !== 'undefined') {
        let removeIdx = state.findIndex((x) => { return x.id === action.payload })
        state.splice(removeIdx, 1)
      }
    }
  }
})

export let { increaseCount, decreaseCount, addCart, removeFromCart } = cartItems.actions
export default cartItems