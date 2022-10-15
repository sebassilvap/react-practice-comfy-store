import React, { useState } from 'react';
import styled from 'styled-components';

// if images is undefined -> use array with object and url as empty string!
const ProductImages = ({ images = [{ url: '' }] }) => {
  // **** state variable
  const [main, setMain] = useState(images[0]); // first image in my array
  //console.log(images); // TEST
  //console.log(main);

  // **** RETURN
  return (
    <Wrapper>
      <img src={main.url} alt='main' className='main' />
      {/* gallery of images */}
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])} // when I click, this turns into the main one!
              // add active class to the main image I display
              className={`${image.url === main.url ? 'active' : null}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

// Styled Component - Wrapper
const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
