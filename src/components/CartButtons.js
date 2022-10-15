import React from 'react';
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useProductsContext } from '../context/products_context';
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { CLEAR_CART } from '../actions';

const CartButtons = () => {
  // cart-btn-wrapper -> 2 case uses:
  // gobal classes that we would like to add -> but in this CSS of the Wrapper we don't have this class (this is not the case)
  // the class is in Navbar.js (this is the case!)

  // **** closeCart functionality
  const { closeSidebar } = useProductsContext();

  // **** grab the total of items from the cart context
  const { total_items, clearCart } = useCartContext();

  // **** values from the user_context - Auth0
  const { loginWithRedirect, myUser, logout } = useUserContext();

  // **** RETURN
  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        Cart
        <span className='cart-container'>
          <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>

      {/* login & logout buttons */}
      {/*
       * if I'm logged in -> show me the logout
       * if I log out -> show me the login
       * I can check that with 'myUser'
       */}
      {myUser ? (
        // if TRUE -> show logout
        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            // the moment I log out, I clean the cart
            clearCart();
            logout({ returnTo: window.location.origin });
          }}
        >
          Logout <FaUserMinus />
        </button>
      ) : (
        // if FALSE -> show login
        <button type='button' className='auth-btn' onClick={loginWithRedirect}>
          Login <FaUserPlus />
        </button>
      )}
    </Wrapper>
  );
};

// Styled Component - Wrapper
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: var(--clr-grey-1);
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-1);
    display: flex;

    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--clr-grey-1);
    letter-spacing: var(--spacing);
    svg {
      margin-left: 5px;
    }
  }
`;
export default CartButtons;
