import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  // **** ADD_TO_CART
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;

    // ** check if the item is already in the cart
    const tempItem = state.cart.find((item) => item.id === id + color); // the item with its color - I can have the same item, but with different color
    if (tempItem) {
      // => for an existing item - increase amount
      // map, check the id, if id matches
      const tempCart = state.cart.map((cartItem) => {
        // =============
        // IF id MATCHES
        // =============
        if (cartItem.id === id + color) {
          // create a new amount property
          let newAmount = cartItem.amount + amount; // plus the amount I pass in

          // but check the stock
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          // return all the properties of the item, just change the amount
          return { ...cartItem, amount: newAmount };
        } else {
          // ==============
          // IF NOT MATCH
          // ==============
          // return the item as it is
          return cartItem;
        }
      });

      return { ...state, cart: tempCart };
    } else {
      // => create a new item and add it to the cart
      const newItem = {
        id: id + color, // the id for the cart
        name: product.name,
        color,
        amount,
        image: product.images[0].url, // first item
        price: product.price,
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  // **** REMOVE_CART_ITEM
  if (action.type === REMOVE_CART_ITEM) {
    // if it doesn't match, don't return it
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  // **** CLEAR_CART
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  // **** TOGGLE_CART_ITEM_AMOUNT
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    // get both of those values
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      // check if item.id matches id
      // REMEMBER: id = id + color
      if (item.id === id) {
        // then toggle those values

        // *** increase
        if (value === 'inc') {
          let newAmount = item.amount + 1;
          // check if it is not bigger than stock
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        // *** decrease
        if (value === 'dec') {
          let newAmount = item.amount - 1;
          // check if it is not less than 1
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      // if the value doesn't match -> return the item as it is!
      return item;
    });

    return { ...state, cart: tempCart };
  }

  // **** COUNT_CART_TOTALS
  if (action.type === COUNT_CART_TOTALS) {
    // iterate over our array
    // use reduce
    // count for every item: price & amount of items

    // what I get from reduce is an object, and I can destructure it -> const {} = ...
    // total -> represents whatever we are returning from reduce
    const { total_items, total_amount } = state.cart.reduce(
      (total, cartItem) => {
        // in each iteration -> I access the car item
        const { amount, price } = cartItem;

        // in each iteration, grab amount and add it
        total.total_items += amount;

        // price * amount -> total amount
        total.total_amount += price * amount;

        // ALWAYS !! -> return the total
        return total;
      },
      {
        total_items: 0,
        total_amount: 0,
      }
    ); // I return an object with these 2 values

    // return
    return { ...state, total_items, total_amount }; // JSX -> properties with the same name
  }

  // **** THROW ERROR if action does not match
  //return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
