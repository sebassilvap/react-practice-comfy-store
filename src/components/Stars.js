// #### Stars - Programmatic Approach
// An Array Approach
// ===============================================================

import React from 'react';
import styled from 'styled-components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const Stars = ({ stars, reviews }) => {
  //console.log(stars, reviews); // TEST - example: 3.6 100

  // **** set up an array
  //const tempStars = Array.from({ length: 5 }); // empty array with 5 undefined values
  //console.log(tempStars);

  // for every item I will return a full / half or empty star
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    // index goes from 0 - 4
    //console.log(index);

    // set up variable for half star
    const number = index + 0.5;

    // return from this callback function my span
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill /> // show full star
        ) : stars >= number ? (
          <BsStarHalf /> // show half star
        ) : (
          <BsStar /> // show empty star
        )}
      </span>
    );
  });
  //console.log(tempStars); // TEST

  // **** RETURN
  return (
    <Wrapper>
      {/* here I just render my tempStars array */}
      <div className='stars'>{tempStars}</div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </Wrapper>
  );
};

// Styled Component - Wrapper
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
