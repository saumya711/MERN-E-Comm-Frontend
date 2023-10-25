import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
//import { useParams } from 'react-router-dom';

const CategoryUpdate = ({history, match}) => {
  const {user} = useSelector((state) => ({...state}))

  const [name, setname] = useState('');
  const [loading, setLoading] = useState(false);

  //let { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    return (
        getCategory(match.params.slug)
      .then((c) =>
      setname(c.data.name)
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setname('');
        toast.success(`"${res.data.name}" is updated`);
        history.push('/admin/category');
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
              {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Category</h4>}
              {categoryForm()}
              <hr />
            </div>
        </div>
    </div>
  )
}

export default CategoryUpdate;
