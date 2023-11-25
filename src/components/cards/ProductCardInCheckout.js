import React from 'react';
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from 'react-redux';

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
        <td>1</td>
        <td>shipping icon</td>
        <td>delete icon</td>
      </tr>
    </tbody>
  )
}

export default ProductCardInCheckout
