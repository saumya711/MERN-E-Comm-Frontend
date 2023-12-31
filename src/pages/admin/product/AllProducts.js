import React, {useEffect, useState} from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount, deleteProduct } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const { user } = useSelector((state) => ({...state}))

  useEffect(() => {
    LoadAllProducts();
  }, []);

  const LoadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
    .then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    })
  }

  const handleRemove = (slug) => {
    let answer = window.confirm("Are you sure delete?");
    if(answer) {
      // console.log("Delete Product", slug)
      deleteProduct(slug, user.token)
      .then((res) => {
        setLoading(false);
        toast.error(`${res.data.title} deleted`);
        LoadAllProducts();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      })
    }
  }

  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminNav />
          </div>
          
          <div className='col'>
            {loading ? (
              <h4 className='text-danger'>Loading....</h4>
            ) : (
              <h4 className='mt-2'>All Products</h4>
            )}
            <div className='row'>
              {products.map((product) => (
                <div key={product._id} className='col-md-4 pb-3'>
                  < AdminProductCard 
                    product={product} 
                    handleRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  )
}

export default AllProducts;
