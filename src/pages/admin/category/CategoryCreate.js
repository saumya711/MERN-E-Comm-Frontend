import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
  createCategory,
  getAllCategories,
  deleteCategory
} from '../../../functions/category';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from "../../../components/forms/CategoryForm"
import LocalSearch from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const {user} = useSelector((state) => ({...state}))

  const [name, setname] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  // Search and Filter - Step 1
  const [keyword, setKeyword] = useState("");

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
        loadCategories();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  }

  const hanldeDelete = async (slug) => {
    // let answer = window.confirm("Delete?");
    // console.log(answer, slug);
    if (window.confirm("Are you sure delete this category?")) {
      setLoading(true);
      deleteCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data)}
          ;
        })
    }
  }

  // step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Craete Category</h4>}
          
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setname={setname}
          />

          {/* step 2 and 3*/}
          < LocalSearch 
            keyword={keyword}
            setKeyword={setKeyword}
          />
          
          {/* step 5 */}
          {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span 
              onClick={() => hanldeDelete(c.slug)}
              className='btn btn-sm float-right'>
                <DeleteOutlined className='text-danger'/>
              </span>
              <Link to={`/admin/category/${c.slug}`}>
              <span className='btn btn-sm float-right'>
                <EditOutlined className='text-success' />
              </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate;