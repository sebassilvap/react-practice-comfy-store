// ### E-Commerce PROJECT
// Styled Components BASICS

// =========================================================================

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';

// **** EXPLANATION 1
// import default from styled components
import styled from 'styled-components';
// styled.ANY HTML ELEMENT that I want

// **** EXPLANATION 2
import Testing from './Testing';

const Button = styled.button`
  /*Here I write the CSS I want for this component -> button*/
  background: green;
  color: white;
`;

const Container = styled.div`
  /*styles for this div element*/
  background: red;
  color: white;
  font-size: 2rem;

  /*select clas or elements inside the styled component*/
  /* no name collisions */
  .hero {
    font-size: 8rem;
  }
`;

const Container2 = styled.div`
  /*styles for this div element*/
  background: red;
  color: white;
  font-size: 2rem;

  /*select clas or elements inside the styled component*/
  /* no name collisions */
  .hero {
    font-size: 4rem;
  }
`;

/*That means: .hero class is different depending the Component*/

function App() {
  return (
    <div>
      <h4>comfy sloth starter</h4>

      {/* Styled Components EXPLANATION 2 */}
      <Testing />

      {/* Styled Components EXPLANATION 1 */}
      <Button>click me over here</Button>
      <Container>
        <div>
          <h3>hello world</h3>
        </div>

        <div className='hero'>hero text</div>
      </Container>
      <Container2>
        <div>
          <h3>hello world</h3>
        </div>

        <div className='hero'>hero text</div>
      </Container2>
    </div>
  );
}

export default App;
