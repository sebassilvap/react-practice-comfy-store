import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useCartContext } from '../context/cart_context';
import AmountButtons from './AmountButtons';

const AddToCart = ({ product }) => {
  // **** destructure 3 things: id, stock & colors
  const { id, stock, colors } = product;
  //console.log(colors); // array with hex values of colors

  // => grab addToCart function from useCartContext
  const { addToCart } = useCartContext();

  // **** 2 state values -> amount & colors
  const [mainColor, setMainColor] = useState(colors[0]); // first color by default
  const [amount, setAmount] = useState(1); // by default 1

  // **** functionality for increase/decrease amount
  // ** INCREASE
  const increase = () => {
    setAmount((oldAmount) => {
      // whatever we return from this function -> will be the new value
      let tempAmount = oldAmount + 1;
      // check if tempAmount > stock value
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };

  // ** DECREASE
  const decrease = () => {
    setAmount((oldAmount) => {
      // whatever we return from this function -> will be the new value
      let tempAmount = oldAmount - 1;
      // check if tempAmount < 1
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  // **** RETURN
  return (
    <Wrapper>
      {/* COLORS */}
      <div className='colors'>
        <span>colors : </span>
        <div>
          {/* iterate over my colors -> once I click on my color I set my state value */}
          {/* add background dynamically from my colors array */}
          {colors.map((color, index) => {
            return (
              <button
                key={index}
                style={{ background: color }}
                // add dynamically 'active' class to the main color
                className={`${
                  mainColor === color ? 'color-btn active' : 'color-btn'
                }`}
                // once I click -> change state value of mainColor
                onClick={() => setMainColor(color)}
              >
                {/* when I click the color, a check icon should be there */}
                {mainColor === color ? <FaCheck /> : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* AMOUNT BUTTONS +/- */}
      <div className='btn-container'>
        {/* 3 props to pass: amount, increase & decrease functions */}
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to='/cart'
          className='btn'
          onClick={() => addToCart(id, mainColor, amount, product)} // check cart_context.js
          // now in cart_reducer we handle this action
        >
          add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

// Styled Component - Wrapper
const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
