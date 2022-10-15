import React from 'react';
import styled from 'styled-components';

// A GOOD PRACTICE
// Wrap my whole react component into the styled component!

const Testing = () => {
  return (
    <Wrapper>
      <h3>hello world</h3>
      <p>hello people</p>
      <div className='article'>
        <p>this is article</p>
      </div>
      <button>click me</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  /* here I apply my styles */
  h3 {
    color: red;
  }
  .article {
    /* like in SASS */
    p {
      color: green;
    }
  }
`;

export default Testing;

// Wrapper -> does not add any functionality or affect it!! -- IMPORTANT!!
// with styled components, I don't have to place all my styles in my CSS file

// ONE MORE IMPORTANT THING!
// It is not recommended to overuse the nested selectors!
// like for example: 7 levels of selectors
