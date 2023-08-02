import React, { useState, useEffect} from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const RegisterComplete = ({ history }) => {

  const [email, setEmail] = useState("");
  const [ password, setPassword ] = useState(""); 

  useState(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

  }

  const completeRegistrationForm = () => {
    return(
      <form onSubmit={handleSubmit}>
      <input type='email' className='form-control' value={email} disabled />

      <input 
      type='password' 
      className='form-control'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder='Enter Your Password'
      autoFocus />

      <button type='submit' className='btn btn-raised mt-3'>Register</button>
    </form>
    )
    
  }
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-">
          <h4>Complete Registration</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterComplete
