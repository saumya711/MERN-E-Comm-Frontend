import React from 'react';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Avatar, Badge } from 'antd';

const FileUpload = ({ values, setValues, setLoading}) => {
    const { user } = useSelector((state) => ({ ...state}));

    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        setLoading(true);
        // resize
        let files = e.target.files;
        let allUploadedFiles = values.images;
        if (files) {
            for ( let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        // console.log(uri);
                        axios.post(
                            `${process.env.REACT_APP_API}/upload-images`,
                            { image: uri },
                            {
                                headers: {
                                    authtoken: user ? user.token : "",
                                },
                            }
                        )
                        .then((res) => {
                            // console.log("Image Upload RES Data", res);
                            setLoading(false);
                            allUploadedFiles.push(res.data);

                            setValues({ ...values, images: allUploadedFiles });
                        })
                        .catch((err) => {
                            setLoading(false);
                            // console.log("Cloudinary Upload Err", err);
                        });
                    },
                    "base64",
                );
            }
        }

    }

    const handleImageRemove = (public_id) => {
        setLoading(true);
        console.log("remove image", public_id);
        axios.post(`${process.env.REACT_APP_API}/remove-images`, {public_id}, {
            headers: {
                authtoken: user ? user.token : "",
            },
        })
        .then((res) => {
            setLoading(false);
            const { images } = values;
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id;
            });
            setValues({ ...values, images: filteredImages});
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <>
            <div className='row'>
                {values.images && values.images.map((image) => (
                    <Badge 
                        count="X" 
                        key={image.public_id} 
                        onClick={() => handleImageRemove(image.public_id)}
                        style={{ cursor: 'pointer'}}
                    >
                        <Avatar 
                            src={image.url}
                            shape='square'
                            size={100}
                            className='ml-3'
                        />
                    </Badge>
                ))}
            </div>
            <div className='row'>
                <label className='btn btn-primary btn-raised mt-3'>
                    Choose File
                    <input
                        type='file'
                        multiple
                        hidden
                        accept='images/*'
                        onChange={fileUploadAndResize}
                    />
                </label>
            </div>
        </>
    )
}

export default FileUpload
