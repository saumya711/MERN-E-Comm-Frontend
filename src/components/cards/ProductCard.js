import React, { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { showAverage } from '../../functions/rating';
import _ from 'lodash';

const { Meta } = Card;

const ProductCard = ({product}) => {
  const [tooltip, setTooltip] = useState('Click to add');

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in localStorage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      console.log('unique', unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      setTooltip("Added");
    }
  }

  // destructure
  const { title, description, images, slug, price } = product;
  
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product) 
        ) : (
          <div className='text-center pt-1 pb-3'>No Rating Yet</div>
      )}
      <Card
        cover={
          <img 
            src={images && images.length ? images[0].url : ""}
            style={{ height: '200px', objectFit: "cover"}}
            className='p-1'
          />
        }

        actions={[ 
          <Link to={`/product/${slug}`}>
              <EyeOutlined className='text-primary' /> <br /> View Product
          </Link>, 
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className='text-danger' /> <br /> Add to Cart
            </a>
          </Tooltip>
          
        ]}
      >
        <Meta 
          title={`${title} - $${price}`} 
          description={`${description && description.substring(0, 40)}...`} 
        />
      </Card>
    </>
  )
}

export default ProductCard
