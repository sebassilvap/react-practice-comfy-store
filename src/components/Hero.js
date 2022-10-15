// #### Hero Component

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import heroBcg from '../assets/hero-bcg.jpeg';
import heroBcg2 from '../assets/hero-bcg-2.jpeg';

const Hero = () => {
  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          design your <br />
          comfort zone <br />
        </h1>
        <h4>with @SebasSilvaP 🥰</h4>

        <p>
          Este sitio web es una practica de React. El sitio ha sido diseñado con
          HTML, CSS, JavaScript y React. Los productos mostrados NO SON REALES y
          el objetivo es simular una pagina web tipo E-Commerce. Por favor no
          intentar comprar los productos mostrados en esta pagina o proporcionar
          datos de tarjetas de credito o cuentas PayPal en esta pagina.
          Creditos: @JohnSmilga
        </p>
        <Link to='/products' className='btn hero-btn'>
          shop now!
        </Link>
      </article>
      <article className='img-container'>
        {/* hero bcg & hero bcg 2 -> images */}
        {/* these 2 classes are in the Styled Component */}
        <img src={heroBcg} alt='nice table' className='main-img' />
        <img src={heroBcg2} alt='person working' className='accent-img' />
      </article>
    </Wrapper>
  );
};

// Styled Component
const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: var(--clr-grey-5);
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`;

export default Hero;
