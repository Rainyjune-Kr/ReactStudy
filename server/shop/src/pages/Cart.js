import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, decreaseCount, removeFromCart } from '../store/cartItemsSlice.js';
import { increaseUserAge } from '../store/userSlice.js';

function Cart() {
  let user = useSelector((state) => state.user);
  let dispatch = useDispatch();
  return (
    <div>
      <h6>{ user.name }({ user.age })의 장바구니</h6>
      <button onClick={ () => { dispatch(increaseUserAge()) } }>버튼</button>
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
          <th>삭제</th>
        </tr>
        </thead>
        <tbody>
          <CartItemRows/>
        </tbody>
      </Table>
    </div>
  )
}

function CartItemRows(props) {
  let cartItems = useSelector((state) => { return state.cartItems });
  console.log('cart Items : ' + cartItems)
  let dispatch = useDispatch();
  return (
    <>
      {
        cartItems.map(
          function (x, rowIdx) {
            return (
              <tr key={rowIdx}>
                <td>{rowIdx + 1}</td>
                <td>{x.name}</td>
                <td>{x.count}</td>
                <td>
                  <button className='btn btn-outline-primary btn-sm' onClick={() => {
                    dispatch(increaseCount(x.id))
                  }}>+</button>
                  <button className='btn btn-outline-primary btn-sm' onClick={() => {
                    dispatch(decreaseCount(x.id))
                  }}>-</button>
                </td>
                <td>
                  <button className='btn btn-outline-primary' onClick={() => {
                    dispatch(removeFromCart(x.id))
                  }}>삭제</button>
                </td>
              </tr>
            )
          })}
    </>
  )
}

export default Cart;