import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../functions/category';

const CategoryList = () => {
    const [ categories, setCategories ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllCategories().then((c) => {
            setCategories(c.data);
            console.log("categories",categories)
            setLoading(false);
        });
    },[]);

    return (
        <div className='container'>
            <div className='row'>
                {loading ? (
                    <h4 className='text-center'>Loading....</h4>
                ) : (
                    categories.map((c) => (
                        <div key={c._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
                            <Link to={`/category/${c.slug}`}>{c.name}</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryList
