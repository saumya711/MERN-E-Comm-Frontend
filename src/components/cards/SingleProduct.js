import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import laptop from "../../images/laptop.png";

const { Meta } = Card;

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product;

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
        </div>
        <div className='col-md-5'>
            <Card
              actions={[
                <>
                  <ShoppingCartOutlined className='text-success' /> <br /> Add to Cart
                </>,
                <Link to="/">
                  <HeartOutlined  className='text-info'/> <br /> Add to Wishlist
                </Link>
              ]}
            >
              <Meta title={title} description={description} />
            </Card>
        </div>
    </>

  )
}

export default SingleProduct
