import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getAllCategories, getSubCategories } from '../../../functions/category';

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
}

const ProductCreate = () => {
  const [ values, setValues ] = useState(initialState);
  const [ subOptions, setSubOptions ] = useState([]);
  const [ showSub, setShowSub ] = useState(false);

  const {user} = useSelector((state) => ({...state}));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return (
      getAllCategories()
      .then((c) =>
        setValues({ ...values, categories: c.data})
      )
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`"${res.data.title}" is Created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      })
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
    //console.log(e.target.name, "------", e.target.value);
  }

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category", e.target.value);
    setValues({...values, subs: [], category: e.target.value});
    getSubCategories(e.target.value)
      .then((res) => {
        console.log("Sub Categories", res);
        setSubOptions(res.data);
      });
      setShowSub(true);
  }

  return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'>
            <AdminNav />
            </div>
            <div className='col-md-10'>
                <h4>Product Create</h4>
                <hr />

                <ProductCreateForm 
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues}
                  handleCategoryChange={handleCategoryChange}
                  subOptions={subOptions}
                  showSub={showSub}
                />
            </div>
        </div>
    </div>
  )
}

export default ProductCreate
