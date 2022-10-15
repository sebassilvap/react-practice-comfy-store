import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  // invoke useFilterContext -> my Hook
  const { filtered_products: products, grid_view } = useFilterContext();

  // **** return when NO PRODUCTS
  // if my filter returns an empty array
  if (products.length < 1) {
    return (
      // inline CSS because I don't want to capitalize this message
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched wour search :(
      </h5>
    );
  }

  // **** return for LIST VIEW
  if (grid_view === false) {
    // products prop with the products coming from my filter context
    return <ListView products={products} />;
  }

  // **** return for GRID VIEW
  // pass these products (coming from the context) in the GRID view
  return <GridView products={products}>product list</GridView>;
};

export default ProductList;
