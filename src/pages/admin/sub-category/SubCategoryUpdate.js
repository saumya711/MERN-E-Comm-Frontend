import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../functions/category';
import { GetSubCategory, updateSubCategory } from '../../../functions/subCategory';
import CategoryForm from "../../../components/forms/CategoryForm";

const SubCategoryUpdate = ({match, history}) => {
  const {user} = useSelector((state) => ({...state}))

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  const loadCategories = () => {
    return (
      getAllCategories()
      .then((c) =>
        setCategories(c.data)
      )
    )
  }

  const loadSubCategory = () => {
    return (
        GetSubCategory(match.params.slug)
        .then((s) =>{
            setName(s.data.name);
            setParent(s.data.parent);
        })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    updateSubCategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is Updated`);
        history.push('/admin/sub-category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Update Sub Category</h4>}

          <div className='form-group pt-2'>
            <label>Parent Category</label>
            <select 
              name="category" 
              className='form-control' 
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Select Category</option>
              {categories.length > 0 && categories.map((c) => (
                <option key={c._id} value={c._id} selected={c._id === parent}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setname={setName}
          />

        </div>
      </div>
    </div>
  )
}

export default SubCategoryUpdate;
