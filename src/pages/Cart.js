import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDB = () => {
    //
  }
  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='col-md-8'>
        <h4>Cart / {cart.length}</h4>
          {!cart.length ? (
            <h4>
              No Products in Crt. <Link to="/shop">Continue Shopping</Link>
            </h4>
          ) : (
            "Show Cart Item"
          )}
        </div>

        <div className='col-md-4'>
          <h4>Order Summery</h4>
          <hr />
          <p>Products</p>
          {cart.map((c,i) => (
            <div key={i}>
              <p>{c.title} x {c.count} = ${c.price * c.count}</p>
            </div>
          ))}
          <hr/>
          Total: <b>${getTotal()}</b>
          <hr/>
          {user ? (
            <button 
              className='btn btn-sm btn-primary mt-2'
              onClick={saveOrderToDB}
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className='btn btn-sm btn-primary mt-2'>
              <Link
                to={{
                    pathname: '/login',
                    state: { from: "cart"},
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>  
      </div>
    </div>
  )
}

export default Cart
