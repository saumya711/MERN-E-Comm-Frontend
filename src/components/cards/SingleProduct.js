import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.png";
import ProductListItems from './ProductListItems';
import StarRatings from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

  return (
    <>
      <div className='col-md-7'>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((image) => <img src={image.url} key={image.public_id}/>)}
          </Carousel>
        ) : (
          <Card cover={<img src={laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type='card'>
          <TabPane tab="Description" key="1">
            {description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className='col-md-5'>
        <h1 className="bg-info p-3">{title}</h1>
        
        {product && product.ratings && product.ratings.length > 0 ? showAverage(product) : "No rating yet"}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className='text-success' /> <br /> Add to Cart
            </>,
            <Link to="/">
              <HeartOutlined  className='text-info'/> <br /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRatings
                name={_id}
                numberOfStars={5}
                rating={star}
                starRatedColor="red"
                changeRating={onStarClick}
                isSelectable={true}
              />
          </RatingModal>
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>

  )
}

export default SingleProduct
