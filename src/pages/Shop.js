import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByFilter, getProductsByCount } from '../functions/product';
import ProducCard from '../components/cards/ProductCard'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search; 

  useEffect(() => {
    loadAllProducts();
  }, []);

  // 1. load products by defaults on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  // 2. load products on user search input
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ searchQuery: text});
    }, 300)
    return () => clearTimeout(delayed);
  }, [text]);

  const fetchProducts = (text) => {
    fetchProductsByFilter(text).then((res) => {
      setProducts(res.data);
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          Search/filter menu
        </div>

        <div className='col-md-9'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4 className='text-danger'>Products</h4>
          )}
 
          {products.length < 1 && <p>No Products Found</p>}

          <div className='row pb-5'>
            {products.map((product) => (
              <div key={product._id} className='col-md-4 mt-5'>
                <ProducCard product={product} />
              </div> 
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
