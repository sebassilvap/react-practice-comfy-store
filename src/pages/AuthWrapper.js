import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

// This component will wrap all my routes!
// our whole app
// if loading -> display loading message
// if error -> display error message
// once we're done loading -> display children -> children will be our whole app
const AuthWrapper = ({ children }) => {
  // **** destructure 2 things from useAuth0
  const { isLoading, error } = useAuth0();

  // **** check if loading
  if (isLoading) {
    // if I'm loading
    return (
      <Wrapper>
        <h1>Loading... 😱</h1>
      </Wrapper>
    );
  }
  if (error) {
    // if error
    return (
      <Wrapper>
        <h1>{error.message} 😨</h1>
      </Wrapper>
    );
  }
  // if no loading, and no error
  return <>{children}</>;
};

// Styled Component - Wrapper
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
