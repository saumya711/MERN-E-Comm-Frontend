import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getAllCategories,
  deleteCategory
} from '../../../functions/category';

const CategoryCreate = () => {
  const {user} = useSelector((state) => ({...state}))

  const [name, setname] = useState('');
  const [loading, setLoading] = useState(false);
  const [ categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return (
      getAllCategories()
      .then((c) =>
        setCategories(c.data)
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setname('');
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  }

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Category Name</label>
          <input 
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setname(e.target.value)}
            autoFocus
            required
          />
          <button className='btn btn-outline-primary mt-3'>Save</button>
        </div>
      </form>
    )
  }
  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminNav />
          </div>
            <div className='col'>
              {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Craete Category</h4>}
              {categoryForm()}
              <hr />
              {categories.length}
            </div>
        </div>
    </div>
  )
}

export default CategoryCreate;