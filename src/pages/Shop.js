import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsByCount } from '../functions/product';
import ProducCard from '../components/cards/ProductCard'

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

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
