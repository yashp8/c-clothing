import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button-component';
import './product-cars.styles.scss';

export default function ProductCard(props) {
  const { product } = props;
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductCartHandler = () => {
    addItemToCart(product);
  };

  return (
    <div className='product-card-container'>
      <img src={imageUrl} alt={`${name}`} />
      <div className='footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <Button buttonType='inverted' onClick={addProductCartHandler}>
        Add to cart
      </Button>
    </div>
  );
}