import React, { useEffect, useState} from 'react';
import { getCategory } from '../../functions/category';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    	setLoading(true);
      getCategory(slug).then((c) => {
        setCategory(c.data);
        console.log(JSON.stringify(c.data, null, 4));
      })
  }, []);

  return (
    <div>
      {slug}
    </div>
  )
}

export default CategoryHome
