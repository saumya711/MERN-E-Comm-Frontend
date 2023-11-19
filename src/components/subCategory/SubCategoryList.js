import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAllSubCategories } from '../../functions/subCategory';

const SubCategoryList = () => {
    const [ subs, setSubs ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllSubCategories().then((res) => {
            setSubs(res.data);
            console.log("subs",subs)
            setLoading(false);
        });
    },[]);

    return (
        <div className='container'>
            <div className='row'>
                {loading ? (
                    <h4 className='text-center'>Loading....</h4>
                ) : (
                    subs.map((s) => (
                        <div key={s._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
                            <Link to={`/sub-category/${s.slug}`}>{s.name}</Link>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default SubCategoryList
