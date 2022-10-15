import React from 'react';
import styled from 'styled-components';
import { PageHero } from '../components';
import aboutImg from '../assets/hero-bcg.jpeg';

const AboutPage = () => {
  return (
    <main>
      <PageHero title='About' />
      <Wrapper className='page section section-center'>
        {/* inside here -> 2 column layout */}
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>our story</h2>
            <div className='underline'></div>
          </div>
          {/* about - text */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur
            nam exercitationem, a quibusdam ea similique fugiat? Sunt ex hic
            amet dignissimos atque consectetur. Ipsam quasi, sed ipsa iure sint
            minima animi autem hic enim voluptatem ratione sunt consequatur amet
            unde cumque nam tenetur cum. Sapiente, dolor placeat magnam,
            voluptatem eos culpa ex id blanditiis veritatis fuga similique
            aliquid iusto error?
          </p>
        </article>
      </Wrapper>
    </main>
  );
};

// Styled Component
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export default AboutPage;
