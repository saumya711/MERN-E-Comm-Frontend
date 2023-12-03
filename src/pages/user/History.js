import React, {useState, useEffect} from 'react'
import UserNav from '../../components/nav/UserNav';
import { getUserOrders } from '../../functions/user';
import { useSelector, useDispatch } from 'react-redux';

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

  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <UserNav />
          </div>
            <div className='col'>
                User Home Page
            </div>
        </div>
    </div>
  )
}

export default History
