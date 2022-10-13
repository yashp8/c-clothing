import { Outlet } from 'react-router-dom';
import { React, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {
  LogoContainer,
  NavLink,
  NavLinks,
  NavigationContainer,
} from './navigation.styles';
// import { UserContext } from '../../contexts/user.contex';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import selectCurrentUser from '../../store/user/user.selector';

export default function Navigation() {
  const currentUser = useSelector(selectCurrentUser);

  // const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <Logo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>SHOP</NavLink>
          {currentUser ? (
            <NavLink as='span' onClick={signOutHandler}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
      </NavigationContainer>
      {isCartOpen && <CartDropdown />}
      <Outlet />
    </Fragment>
  );
}
