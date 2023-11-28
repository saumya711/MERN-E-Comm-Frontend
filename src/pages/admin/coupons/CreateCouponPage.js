import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, createCoupon, removeCoupon } from '../../../functions/coupon';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState(false);

  // redux
  const { user } = useSelector((state) => ({ ...state }));
 
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(name, expiry, discount);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`"${res.data.name}" is Created`);
      })
      .catch((err) => {
        console.log("Coupon create error",err);
      })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Coupon</h4>
          <hr/>

          <form onSubmit={handleSubmit}> 
            <div className='form-group'>
              <label className='text-muted'>Name</label>
              <input 
                type='text'
                className='form-control'
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Discount %</label>
              <input 
                type='text'
                className='form-control'
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className='form-group'>
              <label className='text-muted'>Expire Date</label>
              <br />
              <DatePicker
                className='form-control'
                selected={new Date()}
                onChange={(date) => setExpiry(date)}
                value={expiry}
                required
              />
            </div>
            
            <button className='btn btn-primary'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage
