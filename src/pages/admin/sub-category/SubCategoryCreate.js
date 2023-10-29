import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getAllCategories } from '../../../functions/category';
import { getAllSubCategories, createSubCategory, deleteSubCategory } from '../../../functions/subCategory';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from "../../../components/forms/CategoryForm"
import LocalSearch from '../../../components/forms/LocalSearch';

const SubCategoryCreate = () => {
  const {user} = useSelector((state) => ({...state}))

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);

  // Search and Filter - Step 1
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    return (
      getAllCategories()
      .then((c) =>
        setCategories(c.data)
      )
    )
  }

  const loadSubCategories = () => {
    return (
      getAllSubCategories()
      .then((s) =>
        setSubCategories(s.data)
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(name);
    setLoading(true);
    createSubCategory({ name, parent: parentCategory }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`"${res.data.name}" is created`);
        loadSubCategories();
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
      deleteSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubCategories();
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
          {loading ? <h4 className='text-danger'>Loading...</h4> : <h4>Craete Sub Category</h4>}

          <div className='form-group pt-2'>
            <label>Parent Category</label>
            <select 
              name="category" 
              className='form-control' 
              onChange={(e) => setParentCategory(e.target.value)}
            >
              <option>Select Category</option>
              {categories.length > 0 && categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          
          <CategoryForm 
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          {/* step 2 and 3*/}
          < LocalSearch 
            keyword={keyword}
            setKeyword={setKeyword}
          />
          
          {/* step 5 */}
          {subCategories.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
              {s.name}
              <span 
              onClick={() => hanldeDelete(s.slug)}
              className='btn btn-sm float-right'>
                <DeleteOutlined className='text-danger'/>
              </span>
              <Link to={`/admin/sub-category/${s.slug}`}>
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

export default SubCategoryCreate;
