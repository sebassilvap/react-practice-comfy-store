import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [], //array that will always be changing
  all_products: [], // when I wanna go back to the default
  grid_view: true,
  sort: 'price-lowest', // default value should match one of the options
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false, // checkbox of free shipping
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  // grab those products
  const { products } = useProductsContext();
  // I cannot pass these products in the state
  const [state, dispatch] = useReducer(reducer, initialState);

  // **** LOAD_PRODUCTS
  // but what I can do is, when this component mounts, dispatch an action
  // which is going to be LOAD_PRODUCTS
  // and we do this with useEffect
  useEffect(() => {
    // when we dispatch, the payload will be 'products'
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]); // as we fetch the products, we invoke the dispatch with type LOAD_PRODUCTS

  // **** setGridView functionality
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  // **** setListView functionality
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  // **** useEffect when:
  // 1) products array changes
  // 2) the sort type of the product changes
  // 3) when my filters change
  useEffect(() => {
    // FIRST filter, THEN we sort the products!!
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  // ==============================================================
  // REMEMBER for Controlled INPUT
  // We had 2 things:
  // A) State Value
  // B) function, we run every time there's a change in the input
  // ==============================================================
  const updateSort = (e) => {
    // for demonstration
    //const name = e.target.name;

    // the value the user is choosing
    // in this case we care only about the value
    const value = e.target.value;
    //console.log(name, value); // TEST

    // dispatch action
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // **** updateFilters
  // function to call everytime we change something
  // similar to updateSort
  const updateFilters = (e) => {
    // with event object I can access the input or an element that is calling the onChange
    // in this case name attribute
    let name = e.target.name;
    let value = e.target.value;
    //console.log(name, value);

    // ** target.value works for input, but not for button
    // SOLUTION:
    if (name === 'category') {
      value = e.target.textContent;
    }

    // ** for the color -> dataset
    if (name === 'color') {
      value = e.target.dataset.color;
    }

    // ** for the price
    if (name === 'price') {
      value = Number(value); // we'll always have it as number!
    }

    // ** for the checkbox - shipping
    if (name === 'shipping') {
      value = e.target.checked;
    }

    // ** DISPATCH
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  // **** clearFilters
  // set filters back to default
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
