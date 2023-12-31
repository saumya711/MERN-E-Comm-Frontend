import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  };

  const saveOrderToDB = () => {
    // console.log('cart', JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          history.push('/checkout');
        }
      })
      .catch((err) => {
        console.log('cart save err', err);
      });
  };

  const saveCashOrderToDB = () => {
    // console.log('cart', JSON.stringify(cart, null, 4));
    dispatch({
      type: 'CASH_ON_DELIVER',
      payload: true,
    });

    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) {
          history.push('/checkout');
        }
      })
      .catch((err) => {
        console.log('cart save err', err);
      });
  };

  const showCartItems = () => (
    <table className='table table-bordered'>
      <thead className='thead-light'>
        <tr>
          <th scope='col'>Image</th>
          <th scope='col'>Title</th>
          <th scope='col'>Price</th>
          <th scope='col'>Brand</th>
          <th scope='col'>Color</th>
          <th scope='col'>Count</th>
          <th scope='col'>Shipping</th>
          <th scope='col'>Remove</th>
        </tr>
      </thead>
      {cart.map((product) => (
        <ProductCardInCheckout key={product._id} product={product} />
      ))}
    </table>
  )
  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        <div className='col-md-8'>
        <h4>Cart / {cart.length}</h4>
          {!cart.length ? (
            <p>
              No Products in Crt. <Link to="/shop">Continue Shopping</Link>
            </p>
          ) : (
            showCartItems()
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
            <>
              <button 
                className='btn btn-sm btn-primary mt-2'
                onClick={saveOrderToDB}
                disabled={!cart.length}
              >
                Proceed to Checkout
              </button>
              <br />
              <button 
                className='btn btn-sm btn-warning mt-2'
                onClick={saveCashOrderToDB}
                disabled={!cart.length}
              >
                Pay Cash on Delivery
              </button>
            </>
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
