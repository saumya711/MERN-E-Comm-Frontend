import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getAllCategories, getSubCategories } from '../../../functions/category';

const initialState = {
    title: "",
    description: "",
    price: "",
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

const ProductUpdate = ({ match }) => {
    const [ values, setValues ] = useState(initialState);
    const [ categories, setCategories ] = useState([]);
    const [ subOptions, setSubOptions ] = useState([]);
    const [ subIdsArray, setSubIdsArray ] = useState([]);

    const {user} = useSelector((state) => ({...state}));

    //router
    // let { slug } = useParams();
    let { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            //console.log("single product", p);
            // 1 load single product
            setValues({ ...values, ...p.data});

            // 2 load single product category subs
            getSubCategories(p.data.category._id).then((res) => {
                setSubOptions(res.data);
            });

            // 3 prepare array of sub ids
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            console.log('ARR', arr);
            setSubIdsArray((prev) => arr)
        })
    }

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
        //
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        //console.log("Clicked Category", e.target.value);
        setValues({...values, subs: [], category: e.target.value});
        getSubCategories(e.target.value)
          .then((res) => {
            console.log("Sub Categories", res);
            setSubOptions(res.data);
          });
      }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                <AdminNav />
                </div>
                <div className='col-md-10'>
                    <h4>Product Update</h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <ProductUpdateForm 
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        subIdsArray={subIdsArray}
                        setSubIdsArray={setSubIdsArray}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
