import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByFilter, getProductsByCount } from '../functions/product';
import ProducCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0,0]);
  const [ok, setOk] = useState(false);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search; 

  useEffect(() => {
    loadAllProducts();
  }, []);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    })
  }

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

  // 3. load products based on price range
  useEffect(() => {
    console.log('ok to requets');
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300)
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <hr/>

          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            <SubMenu 
              key='1' 
              title={
                <span className='h6'>
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider 
                  className='ml-4 mr-4'
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="5000"
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
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
