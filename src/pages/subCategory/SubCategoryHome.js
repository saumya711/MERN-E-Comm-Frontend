import React, { useEffect, useState} from 'react';
import { GetSubCategory } from '../../functions/subCategory';
import ProductCard from '../../components/cards/ProductCard'

const SubCategoryHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    GetSubCategory(slug).then((res) => {
      setSub(res.data.subCategory);
      setProducts(res.data.products)
      console.log(JSON.stringify(res.data, null, 4));
      setLoading(false);
    })
  }, []);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          {loading ? (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              Loading...
            </h4>
          ) : (
            <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron'>
              {products.length} products in "{sub.name}" sub category
            </h4>
          )}
        </div>
      </div>

      <div className='row'>
        {products.map((product) => (
          <div className='col-md-4' key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubCategoryHome
