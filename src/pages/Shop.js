import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsByFilter, getProductsByCount } from '../functions/product';
import { getAllCategories } from '../functions/category'
import ProducCard from '../components/cards/ProductCard';
import { Menu, Slider, Checkbox } from 'antd';
import { DollarOutlined, DownSquareOutlined } from '@ant-design/icons'

const { SubMenu, Item } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0,0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search; 

  useEffect(() => {
    loadAllProducts();
    getAllCategories().then((res) => setCategories(res.data));
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
    setCategoryIds([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300)
  }

  // 4. load products based on category
  const handleCheckbox = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: '' },
    });
    setPrice([0, 0]);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked) // index or -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1)
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState});
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4>Search/Filter</h4>
          <hr/>

          <Menu defaultOpenKeys={['1', '2']} mode='inline'>
            {/* Price */}
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
            
            {/* category */}
            <SubMenu 
              key='2' 
              title={
                <span className='h6'>
                  <DownSquareOutlined /> category
                </span>
              }
            >
              <div style={{ marginTop: "-10px"}}>
                {categories.map((c) => (
                  <div key={c._id}>
                    <Checkbox 
                      className='pb-2 pl-2 pr-2' 
                      value={c._id} 
                      name='category' 
                      onChange={handleCheckbox}
                      checked={categoryIds.includes(c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                ))}
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