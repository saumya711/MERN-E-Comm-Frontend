import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Pyament = () => {
  return (
    <div className='container p-5 tect-center'>
      <h4>Complete your Purchase</h4>
      <Elements stripe={promise}>
        <div className='col-md-8 offset-md-2'>
          <p>Stripe checkout component</p>
        </div>
      </Elements>
    </div>
  )
}

export default Pyament
