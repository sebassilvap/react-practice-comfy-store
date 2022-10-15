import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/cart_reducer';
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions';

// **** function to check the local storage
// if we have already some value -> cart equals to that
// if not, it'll be an empty array
// access to local storage -> because this is a browser API
const getLocalStorage = () => {
  // check if there's something in local storage with the name 'cart'
  let cart = localStorage.getItem('cart');
  if (cart) {
    // since the value in the local storage is a string
    // parse it back
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

// **** initial state
const initialState = {
  //cart: [], // ONCE I DEFINE THE LOCAL STORAGE:
  cart: getLocalStorage(),
  total_items: 0, // how many items in the cart icon
  total_amount: 0, // total-dollars amount
  shipping_fee: 534, // $ 5.34
};

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  // **** set up my reducer
  // using useReducer
  // IMPORTANT: I don't want amount to be bigger than the amount on the stock
  const [state, dispatch] = useReducer(reducer, initialState);

  // **** add to cart function
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  // **** remove item functions
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // **** toggle amount
  const toggleAmount = (id, value) => {
    // same function to both buttons
    // value -> whether I'm increasing OR decreasing
    //console.log(id, value); // id is the id + color
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };

  // **** clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // **** useEffect for local storage / change in the cart
  useEffect(() => {
    // every time we override the cart
    // take value on local storage and update it
    // REMEMBER: we can only store strings in local storage
    // that's why we use JSON.stringify
    localStorage.setItem('cart', JSON.stringify(state.cart));

    // every time we change something on the cart
    // it will be displaced in multiple places
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]); // every time there is a change in the cart -> useEffect

  // **** RETURN
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
