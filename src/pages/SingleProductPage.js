import React, { useEffect } from 'react';

//import { useParams, useHistory } from 'react-router-dom'; // REACT ROUTER 5
import { useParams, useNavigate } from 'react-router-dom'; // REACT ROUTER 6

import { useProductsContext } from '../context/products_context';
import { single_product_url as url } from '../utils/constants';
import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SingleProductPage = () => {
  // **** get id of product of the url parameters
  const { id } = useParams();
  //console.log(id); // TEST

  // state value -> history
  //const history = useHistory(); // history back from react router dom // REACT ROUTER 5
  const navigate = useNavigate();

  // **** get the loading, error and single product
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  // **** useEffect
  // when I load this page, useEffect, and fetch single product
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]); // as the id changes -> fetch that new product
  //console.log(product);

  // **** useEffect -> to go to home if error in 3 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // to navigate programmatically out of the page -> useHistory HOOK
        // useHistory & method push
        //history.push('/'); // REACT ROUTER 5
        navigate('/'); // REACT ROUTER 6
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]); // error changes from false to true

  // **** check for loading & error
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  //console.log(product); // TEST: to see the properties we have to GRAB!
  // **** destructure the properties to use in return
  const {
    name,
    price,
    description,
    stock,
    stars,
    reviews,
    id: sku,
    company,
    images,
  } = product;

  // =======
  // RETURN
  // =======
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className='section section-center page'>
        <Link to='/products' className='btn'>
          back to products
        </Link>

        {/* display images and info about the product */}
        <div className='product-center'>
          {/* we pass images prop in ProductImages component */}
          <ProductImages images={images} />
          <section className='content'>
            <h2>{name}</h2>
            {/* display the starts -> some logic here (for the icons) */}
            {/* pass stars & reviews as prop */}
            <Stars stars={stars} reviews={reviews} />
            <h5 className='price'>{formatPrice(price)}</h5>
            <p className='desc'>{description}</p>
            <p className='info'>
              <span>Available : </span>
              {stock > 0 ? 'In stock' : 'out of stock'}
            </p>
            <p className='info'>
              <span>SKU : </span>
              {sku}
            </p>
            <p className='info'>
              <span>Brand : </span>
              {company}
            </p>
            <hr />

            {/*
             * check first for the stock
             * if > 0  ==> show available colors and quantity to order
             * if <= 0 ==> don't show this part
             * the whole property 'product' is passed in as a prop
             */}
            {stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

// Styled Component - Wrapper
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
