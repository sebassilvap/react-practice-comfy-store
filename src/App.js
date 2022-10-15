// ### E-Commerce PROJECT
// For a basic explanation of Styled Components -> AppTesting.js & Testing.js!!

// =========================================================================

import React from 'react';
//import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // ReactRouter5
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // ReactRouter6
import { Navbar, Sidebar, Footer } from './components';

// **** importing all the pages at ONCE
// => import 'index.js' from pages folder
// this is suitable for BIG projects
import {
  Home,
  Products,
  SingleProduct,
  About,
  Cart,
  Error,
  Checkout,
  PrivateRoute,
  AuthWrapper,
} from './pages';

function App() {
  return (
    // wrap my whole APP with AuthWrapper!!
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        {/* update to React Router 6 */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products' element={<Products />} />
          <Route path='products/:id' element={<SingleProduct />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          {/* error page */}
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
