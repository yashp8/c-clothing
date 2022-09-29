import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

export default function CheckoutItem(props) {
  const { cartItem } = props;
  const { name, imageUrl, price, quantity } = cartItem;
  const { addItemToCart, removeItemFromCart, removeFromCart } =
    useContext(CartContext);
  const addCartItem = () => {
    addItemToCart(cartItem);
  };

  const removeCartItem = () => {
    removeItemFromCart(cartItem);
  };

  const removeCart = () => {
    removeFromCart(cartItem);
  };

  return (
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={removeCartItem}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addCartItem}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={removeCart}>
        &#10005;
      </div>
    </div>
  );
}
