import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCoupons, createCoupon, removeCoupon } from '../../../functions/coupon';
import AdminNav from '../../../components/nav/AdminNav';

const CreateCouponPage = () => {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-2'>
          <h4>Coupon</h4>
        </div>
      </div>
    </div>
  )
}

export default CreateCouponPage
