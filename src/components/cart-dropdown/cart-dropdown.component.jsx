import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button-component';
import CartItem from '../cart-item/cart-item.components';
import './cart-dropdown.styles.scss';

export default function CartDropdown() {
  const { cartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const goToCheckourHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button onClick={goToCheckourHandler}> Go to checkout </Button>
    </div>
  );
}
