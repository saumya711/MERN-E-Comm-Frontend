import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../../../functions/product';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';
import { getAllCategories, getSubCategories } from '../../../functions/category';
import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

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
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus", "HP"],
    color: "",
    brand: "",
  }

const ProductUpdate = ({ match, history }) => {
    const [ values, setValues ] = useState(initialState);
    const [ categories, setCategories ] = useState([]);
    const [ subOptions, setSubOptions ] = useState([]);
    const [ subIdsArray, setSubIdsArray ] = useState([]);
    const [ selectedCategory, setSelectedCategory ] = useState("");
    const [ loading, setLoading ] = useState(false);

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
        setLoading(true);

        values.subs = subIdsArray;
        values.category = selectedCategory ? selectedCategory : values.category;
        updateProduct(slug, values, user.token)
        .then((res) => {
            setLoading(false);
            toast.success(`"${res.data.title}" is Updated`);
            history.push('/admin/products');
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
            toast.error(err.response.data.err);
        })
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleCategoryChange = (e) => {
        e.preventDefault();
        //console.log("Clicked Category", e.target.value);
        setValues({...values, subs: [] });

        setSelectedCategory(e.target.value);

        getSubCategories(e.target.value)
          .then((res) => {
            console.log("Sub Categories", res);
            setSubOptions(res.data);
          });

        // if user clicks back to the original category
        // show it's sub categories in default
        if(values.category._id === e.target.value) {
            loadProduct();
        }
        // clear old sub categories
        setSubIdsArray([]);  
      }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>
                <AdminNav />
                </div>
                <div className='col-md-10'>
                    {loading ? (
                    <LoadingOutlined className='text-danger h1'/>
                    ) : (
                    <h4>Product Update</h4>
                    )}
                    <hr />
                    {/* {JSON.stringify(values)} */}

                    <div className='p-3'>
                        <FileUpload 
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    
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
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
