// ESSENTIALLY -> products-context.js will be responsible for getting my products from the API
// it's going to get the product & get the single product
// it was going to be an overkill just to create a new context with new reducer, just for controlling the sidebar -> that's why, this functionality is on products_context.js

import axios from 'axios'; // for fetching
import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url as url } from '../utils/constants'; // as -> to give an alias
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions';

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [], // we have all the products in this state value
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  // REMEMBER: dispatch -> the function we use to control the state
  // 'you can only update the state, if there's an action'

  // useReducer, we need to pass 2 things
  // => reducer function : to control our state
  // => the initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  // to have some functionality -> we need to dispatch an action

  // **** functionality to open & close sidebar
  // set up 2 functions: 1 to close sidebar & 1 to open sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  // **** JUST TO SHOWCASE HOW THIS WORKS!
  /*
  // invoke this function
  useEffect(() => {
    openSidebar();
  }, []); // [] -> just run once
  */

  // **** functionality - fetch products
  const fetchProducts = async (url) => {
    // ** dispatch the loading
    dispatch({ type: GET_PRODUCTS_BEGIN }); // set up loading

    // ** try-catch
    try {
      // ** axios -> get
      const response = await axios.get(url);
      const products = response.data;

      // ** the action
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      // if there's error -> dispatch
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // **** useEffect in my context
  // WHY? -> I can fetch it once and then I'm going to distribute it
  useEffect(() => {
    fetchProducts(url);
  }, []); // [] -> to invoke it once

  // **** functionality - fetch single product
  const fetchSingleProduct = async (url) => {
    // where we dispatch when we start loading
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });

    // try-catch
    try {
      // assing my data to single product
      const response = await axios.get(url);
      const singleProduct = response.data;
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
    }
  };

  // ============
  // **** RETURN
  // ============
  return (
    <ProductsContext.Provider
      value={{ ...state, openSidebar, closeSidebar, fetchSingleProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
