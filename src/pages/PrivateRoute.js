import React from 'react';

// ******** REACT ROUTER 6 update!! ********
//import { Route, Redirect } from 'react-router-dom'; // Redirect component -> another way how we can PROGRAMMATICALLY navigate to a different page // REACT ROUTER 5
import { Navigate } from 'react-router-dom'; // REACT ROUTER 6

import { useAuth0 } from '@auth0/auth0-react'; // FOR THE CHECKOUT PAGE -> the user from Auth0

//import { useUserContext } from '../context/user_context'; // will remove later

// ================================================================================
// {children} -> whatever it is in the PrivateRoute -> I want to return
// REMEMBER: we can use this PrivateRoute in multiple laces, if we set it up correctly
// then the rest of the parameters -> rest operator (JavaScript) - don't confuse it with spread -> rest is gathering everything we pass in PrivateRoute

//const PrivateRoute = ({ children, ...rest }) => { // REACT ROUTER 5

// REACT ROUTER 6
const PrivateRoute = ({ children }) => {
  // TEST
  //console.log(children);
  //console.log(rest);

  // **** grab my user
  //const { myUser } = useUserContext(); // REFACTOR!! -> myUser from Auth0
  const { user } = useAuth0();

  // **** set up the route
  // here {...rest} -> spread operator -> first I collect (rest operator), and then I spread them out (spread operator)
  // render -> pass a function

  // REACT ROUTER 5
  /*
  return (
    <Route
      {...rest}
      render={() => {
        // if user exists -> grab my children
        // if not, redirect

        //return myUser ? children : <Redirect to='/' />; // REFACTOR !!
        return user ? children : <Redirect to='/' />;
      }}
    ></Route>  
  );
  */

  // REACT ROUTER 6
  if (!user) {
    return <Navigate to='/' />;
  }
  return children;
};

export default PrivateRoute;
