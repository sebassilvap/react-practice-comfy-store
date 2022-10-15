import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  // **** set up an action that takes those PRODUCTS from the products context
  // and dumps them into the filter context
  // LOAD_PRODUCTS

  // **** filters

  if (action.type === LOAD_PRODUCTS) {
    // *** for the filters
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice); // return the max price from the products
    //console.log(maxPrice);
    // start my filter with my max price

    // *** change my state values
    // IMPORTANT: here use SPREAD OPERATOR
    // we copy the values ==> [...action.payload]
    // not referencing to the same place in the memory!!

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice }, // ...state.filters -> the rest of the values remain the same!
    };
  }

  // *** SET_GRIDVIEW
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  // *** SET_LISTVIEW
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  // *** UPDATE_SORT
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  // *** SORT_PRODUCTS
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;

    // temp products array that change depending on my sort
    let tempProducts = [...filtered_products]; // copy the values of filtered_products

    // a return for every sort option
    // they should match exactly to what we have on 'value' in the form
    // one by one use sort on filtered_products

    // ** price-lowest **
    // ------------------
    if (sort === 'price-lowest') {
      // => we use implicit return (no {})
      //tempProducts = tempProducts.sort((a, b) => a.price - b.price); // SHORT WAY

      // => LONG WAY EXPLANATION
      tempProducts = tempProducts.sort((a, b) => {
        // 1st) check the value of a & b price
        if (a.price < b.price) {
          // a is placed before than b
          return -1;
        }
        if (a.price > b.price) {
          // b is placed before than a
          return 1;
        }
        return 0;
      });
    }
    // ** price-highest **
    // --------------------
    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
    }
    // ** name-a **
    // -------------
    if (sort === 'name-a') {
      // we'll use the method of JavaScript:
      // String.prototype.localeCompare()
      // no worries about the casing
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    // ** name-z' **
    // --------------
    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    // just in case in a weird scenario no filter match
    // instead of showing an empty array
    // I display the same filtered_products array I had at the beginning
    return { ...state, filtered_products: tempProducts };
  }

  // *** UPDATE_FILTERS
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    // in the filter I want to update these values
    return { ...state, filters: { ...state.filters, [name]: value } }; // [name] -> set properties dynamically
  }

  // *** FILTER_PRODUCTS
  if (action.type === FILTER_PRODUCTS) {
    //console.log('filtering products'); // TEST

    // We need 2 values: array of the results of filtered products & all products
    // ** get all the products out of the state
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    // ** set up my new array
    let tempProducts = [...all_products]; // a fresh copy of all the products
    // ADVICE: every time we implement some kind of filtering
    // we ALWAYS need to have access to our default data

    // =======================
    // ** FILTERING PROCESS **
    // =======================
    //
    // ** text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        // return the items that start with the text in text input
        return product.name.toLowerCase().startsWith(text);
      });
    }
    // ** category
    if (category !== 'all') {
      // if it's not all -> I want to filter
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      );
    }
    // ** company
    if (company !== 'all') {
      // if it's not all -> I want to filter
      tempProducts = tempProducts.filter(
        (product) => product.company === company
      );
    }
    // ** color
    if (color !== 'all') {
      // if it's not all -> I want to filter
      tempProducts = tempProducts.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    }
    // ** price
    // less or equal than my current price in the range
    tempProducts = tempProducts.filter((product) => product.price <= price);

    // ** shipping
    // whether the shipping value is true or not
    // if not -> return all the products
    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.shipping === true
      );
    }

    // ** return filtered products
    return { ...state, filtered_products: tempProducts };
  }

  // *** CLEAR_FILTERS
  if (action.type === CLEAR_FILTERS) {
    // return default values
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        //min_price: 0, // because -> ...state.filters
        //max_price: 0,
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  // *** ERROR
  //return state;
  // throw the error if we don't handle the action
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

// =======================================
// REMEMBER the rule of HOOKS:
// When we have a HOOK, we can invoke it
// ==> either in a REACT COMPONENT
// ==> Or in another HOOK
// =======================================
