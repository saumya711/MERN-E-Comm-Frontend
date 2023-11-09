import React, { useState, useEffect} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../../functions/product';

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

const ProductUpdate = ({ match }) => {
    const [ values, setValues ] = useState(initialState);
    const {user} = useSelector((state) => ({...state}));

    //router
    // let { slug } = useParams();
    let { slug } = match.params;

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            //console.log("single product", p);
            setValues({ ...values, ...p.data})
        })
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
                    {JSON.stringify(values)}
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate
