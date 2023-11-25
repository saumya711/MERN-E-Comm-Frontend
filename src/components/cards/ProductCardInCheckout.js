import React from 'react';
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductCardInCheckout = ({ product }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log('Color Changed', e.target.value);

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].color = e.target.value;
        }
      });
  
      // console.log('cart update color', cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    console.log("Available", product.quantity);

    if (count > product.quantity) {
      toast.error(`Max Available Quantity: ${product.quantity}`);
      return;
    }

    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart[i].count = count;
        }
      });
  
      // console.log('cart update count', cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }

  const handleRemove = () => {
    // console.log(product._id, 'going to be remove');
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"))
      }

      cart.map((p, i) => {
        if (p._id === product._id) {
          cart.splice(i, 1);
        }
      });
  
      // console.log('cart update count', cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  }

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto'}}>
            {product.images.length ? (
              <ModalImage small={product.images[0].url} large={product.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{product.brand}</td>
        <td>
          <select 
            onChange={handleColorChange} 
            name='color' 
            className='form-control'
          >
            {product.color ? ( 
              <option value={product.color}>{product.color}</option> 
            ) : ( 
              <option>Select</option> 
            )}
            {colors
              .filter((c) => c !== product.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
            ))}
          </select>
        </td>
        <td>
          <input
            type='number'
            className='form-control'
            value={product.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          {product.shipping === 'Yes' ? (
            <CheckCircleOutlined className='text-success'/>
          ) : (
            <CloseCircleOutlined className='text-danger'/>
          )}
        </td>
        <td>
          <DeleteOutlined 
            className='text-danger pointer' 
            onClick={handleRemove}
          /> 
          </td>
      </tr>
    </tbody>
  )
}

export default ProductCardInCheckout
