import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

// *** For Atuh0 ***
// check .env

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    // every time user logs in
    // save it into the local storage
    cacheLocation='localstorage'
  >
    {/* UserProvider after Auth0Provider -> wraps everything */}
    <UserProvider>
      {/* Wrapp the whole app from ProductsProvder in my Auth0Provider */}
      <ProductsProvider>
        {/*
         * FilterProvider INTO ProductsProvider
         * get some info from the product into the filter
         * it will ensure that we have always access to the data that comes from products provider
         */}

        <FilterProvider>
          {/* everywhere in our app -> we have access to CartProvider */}

          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>,

  document.getElementById('root')
);
