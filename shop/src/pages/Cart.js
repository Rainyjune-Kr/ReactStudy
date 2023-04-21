import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { increaseCount, decreaseCount } from './../store.js'
function Cart() {
  return (
    <div>
      <Table>
        <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
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
              </tr>
            )
          })}
    </>
  )
}

export default Cart;