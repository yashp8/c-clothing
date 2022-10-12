import { createContext, useReducer } from 'react';

import createAction from '../utils/reducer/reducer.util';

function addCartItem(cartItems, productToAdd) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem,
    );
  }
  //
  return [...cartItems, { ...productToAdd, quantity: 1 }];
}

function removeCartItem(cartItems, cartItemToRemove) {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem,
  );
}

function remove(cartItems, cartToRemove) {
  return cartItems.filter((cartItem) => cartItem.id !== cartToRemove.id);
}

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

export const CartContext = createContext({
  isCartOpen: true,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  removeFromCart: () => {},
  cartTotal: 0,
});

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default: {
      throw new Error(`unhandled type of ${type}`);
    }
  }
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

export function CartProvider(props) {
  const { children } = props;

  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0,
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartTotal: newCartTotal,
        cartCount: newCartCount,
        cartItems: newCartItems,
      }),
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItem = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItem);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItem = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemReducer(newCartItem);
  };

  const removeFromCart = (cartToRemove) => {
    const newCartItem = remove(cartItems, cartToRemove);
    updateCartItemReducer(newCartItem);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartItems,
    cartCount,
    removeItemFromCart,
    removeFromCart,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
