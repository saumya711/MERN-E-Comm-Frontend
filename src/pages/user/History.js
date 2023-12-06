import React, {useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice';
import ShowPaymentInfo from '../../components/cards/ShowPaymentInfo';

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

  const showDownloadLink = (order) => {
    return (
      <PDFDownloadLink
        document={<Invoice  order={order}/>}
        fileName='invoice.pdf'
        className='btn btn-sm btn-block btn-outline-primary'
      >
        Download PDF
      </PDFDownloadLink>
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
              {orders.reverse().map((order, i) => (
                <div key={i} className='m-5 p-3 card'>
                  {<ShowPaymentInfo order={order} />}
                  {showOrderInTable(order)}
                  <div className='row'>
                    <div className='col'>
                      {showDownloadLink(order)}
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
