import React from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    // destructure
    const { title, description, images, slug } = product;
    return (
        <Card
            cover={
                <img 
                    src={images && images.length ? images[0].url : ""}
                    style={{ height: '200px', objectFit: "cover"}}
                    className='p-1'
                />
            }

            actions={[ 
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined className='text-primary' />
                </Link>, 
                <DeleteOutlined onClick={() =>handleRemove(slug)} className='text-danger' />
            ]}
        >
            <Meta title={title} description={`${description && description.substring(0, 40)}...`} />
        </Card>
    )
}

export default AdminProductCard
