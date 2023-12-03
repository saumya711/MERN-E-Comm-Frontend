import React, {useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });
  }

  const showPaymentInfo = (order) => {
    return (
      <div>
        <p>
          <span>Order Id: {order.paymentIntent.id}</span>{' / '}
          <span>
            Amount: {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: 'currency',
              currency: "USD"
            })}
          </span>{' / '}
          <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>{' / '}
          <span>Method: {order.paymentIntent.payment_method_types[0]}</span>{' / '}
          <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>{' / '}
          <span>Orderd On:{' / '}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </span>{' / '}
          <span className='badge bg-primary text-white'>STATUS: {order.orderStatus}</span>
        </p>
      </div>
    )
  }

  const showOrderInTable = (order) => {
    return (
      <table className='table table-bordered'>
        <thead className='thead-light'>
          <tr>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
            <th scope='col'>Brand</th>
            <th scope='col'>Color</th>
            <th scope='col'>Count</th>
            <th scope='col'>Shipping</th>
          </tr>
        </thead>

        <tbody>
          {order.products.map((p, i) => (
            <tr key={i}>
              <td><b>{p.product.title}</b></td>
              <td>${p.product.price}</td>
              <td>{p.product.brand}</td>
              <td>{p.color}</td>
              <td>{p.count}</td>
              <td>
                {p.product.shipping === 'Yes' ? (
                  <CheckCircleOutlined className='text-success'/>
                ) : (
                  <CloseCircleOutlined className='text-danger'/>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <UserNav />
          </div>
            <div className='col text-center'>
              <h4>
                {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
              </h4>
              {orders.map((order, i) => (
                <div key={i} className='m-5 p-3 card'>
                  {showPaymentInfo(order)}
                  {showOrderInTable(order)}
                  <div className='row'>
                    <div className='col'>
                      <p>PDF Download</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  )
}

export default History
