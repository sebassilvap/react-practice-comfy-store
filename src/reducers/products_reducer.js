// ========
// ACTIONS
// ========

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

// action -> something we would want to do
// state -> current state OR old state before the update
// once I'm done with my action -> return that new state

const products_reducer = (state, action) => {
  //
  // ========================
  // SIDEBAR - open & close
  // ========================
  if (action.type === SIDEBAR_OPEN) {
    //console.log(action);
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  // ======================================
  // GET_PRODUCTS - begin, success & error
  // ======================================
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, products_loading: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    // update both of my arrays
    // ** featured products
    const featured_products = action.payload.filter(
      (product) => product.featured === true // implicit return (no {})
    );
    return {
      ...state,
      products_loading: false,
      products: action.payload,
      featured_products,
    };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, products_loading: false, products_error: true };
  }
  // ===========================================
  // GET_SINGLE_PRODUCT - begin, success & error
  // ===========================================
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      single_product_loading: true,
      single_product_error: false,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      single_product_loading: false,
      single_product: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      single_product_loading: false,
      single_product_error: true,
    };
  }

  //return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default products_reducer;
