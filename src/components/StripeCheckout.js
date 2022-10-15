import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js'; // function
import {
  // from react -> components and hooks
  CardElement,
  useStripe,
  Elements,
  useElements,
} from '@stripe/react-stripe-js';

// **** OUR OWN IMPORTS
import axios from 'axios'; // post request
import { useCartContext } from '../context/cart_context';
import { useUserContext } from '../context/user_context';
import { formatPrice } from '../utils/helpers';

//import { useHistory } from 'react-router-dom'; // REACT ROUTER 5
import { useNavigate } from 'react-router-dom'; // REACT ROUTER 6

// **** invoke loadStripe
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// from this CheckoutForm we'll comunicate with the function
// which is in the server
// this won't be in the Frontend
// from the function communicate with Stripe
// send back the data
// the function will be a middleman
// function to server --> more secure than directly communicating with Stripe
// Stripe sends back the data
// and we send this data back to the component
const CheckoutForm = () => {
  // **** state variables
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();

  //const history = useHistory(); // REACT ROUTER 5
  const navigate = useNavigate(); // REACT ROUTER 6

  // STRIPE STUFF
  // this part comes from Stripe
  const [succeeded, setSucceeded] = useState(false); // by default false
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true); // by default true
  // client secret -> from the function we will create (Netlify function)
  const [clientSecret, setClientSecret] = useState('');
  // invoke Stripe using stripe HOOK
  const stripe = useStripe();
  const elements = useElements();

  // **** .cardStyle CLASS -> from Stripe
  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  // **** function - createPaymentIntent
  // here we'll set our post request
  // it should be asynchronous
  const createPaymentIntent = async () => {
    //console.log('hello from stripe checkout');

    // *** make a post with axios
    try {
      const { data } = await axios.post(
        '/.netlify/functions/create-payment-intent',
        JSON.stringify({ cart, shipping_fee, total_amount }) // the 3 things to pass
      );
      //console.log(data); // If OK -> get back my client_secret

      // IF SUCCESSFUL
      //console.log(data.clientSecret); // if we get client secret -> OK!
      setClientSecret(data.clientSecret);

      // *** In case of fetch error
    } catch (error) {
      //console.log(error.response); // error in AXIOS! // comment -> just for development processes
    }
  };

  // **** invoke useEffect
  // only once the component loads
  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line
  }, []);

  // **** function handleChange
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  // **** function handleSubmit
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    // get the payload
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    // if ERROR
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // if we ae successful
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      // navigate away from the page
      // once the timeout expires return to home page in 10 seconds
      setTimeout(() => {
        clearCart();
        //history.push('/'); // REACT ROUTER 5
        navigate('/'); // REACT ROUTER 6
      }, 3000);
    }
  };

  return (
    <div>
      {/* depending on the value of succeeded */}
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful</h4>
          <h4>Redirecting to home page shortly 🥰</h4>
        </article>
      ) : (
        <article style={{ maxWidth: '80%' }}>
          {/* check if myUsr exists -> if yes, grab the name */}
          <br />
          <h4>Hello, {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>TEST Card Number : 4242 4242 4242 4242</p>
          <p>
            Este es un número de tarjeta de crédito ficticio. Una vez que
            ingrese este número y datos de mes (MM) y año (AA), se valida su
            compra y regresa a la página de inicio.
          </p>
          <p>
            RECUERDE: Esto no es una compra real, es solo una simulación! 😛
          </p>
        </article>
      )}
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        {/*
         * BUTTON for the payment
         * disabled if we're processing
         * if disabled or succeded
         */}
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              'Pay Now'
            )}
          </span>
        </button>

        {/* Show any error that happens when processing the payment */}
      </form>
      {/* text once we succeed or before we pay */}
      {error && (
        <div className='card-error' role='alert'>
          {error}
        </div>
      )}
      {/* Sow a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        {/* this message ONLY if payment is successful!! */}
        Payment succeeded, see the result in your
        <a href={`https://dashboard.stripe.com/test/payments`}>
          Stripe dashboard.
        </a>
        Refresh the page to pay again!
      </p>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      {/* inside Wrapper -> my elements component */}
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

// Styled Component - Wrapper
// **** THESE STYLES ARE COMING FROM STRIPE !! ****
const Wrapper = styled.section`
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: '';
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
