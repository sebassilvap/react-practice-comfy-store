import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; // for Auth0, we can simply use this hook, it is not necessary to use this UserContext (here we'll do it) - if we don't want to use Auth0 in multiple places, w can simply use the HOOK

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  // **** set up our destructuring
  // isAuthenticated -> the flag when we have a login
  // loginWithRedirect -> function that perform login functionalities
  // user -> whether we have an user and what are the credentials for the user

  // AFTER REFACTORING !! (look below!)
  // isAuthenticated & isLoading are not needed anymore here!
  const {
    //isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    //isLoading,
  } = useAuth0();

  // **** state value
  const [myUser, setMyUser] = useState(null);

  // **** useEffect to see the values
  useEffect(() => {
    // TEST
    /*
    console.log(`user : ${user}`);
    console.log(`isAuthenticated : ${isAuthenticated}`);
    console.log(`isLoading : ${isLoading}`);
    */

    // => AFTER Auth0 and Stripe installation
    // we REFACTOR this code
    /*
    // if it is authenticated
    if (isAuthenticated) {
      setMyUser(user);
    } else {
      setMyUser(false);
    }
    */

    setMyUser(user); // the user coming from Auth0

    //}, [isAuthenticated]); // when isAuthenticated changes
  }, [user]); // now I do this every time my user changes!!

  // **** RETURN
  return (
    // pass the functions to the context
    <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
      {children}
    </UserContext.Provider>
  );
};

// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
