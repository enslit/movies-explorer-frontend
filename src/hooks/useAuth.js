import React, { createContext, useContext, useEffect, useState } from 'react';
import { any } from 'prop-types';

ProvideAuth.propTypes = {
  children: any,
};

export const authContext = createContext({});

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const signIn = ({ username, password }) => {
    setIsAuthReady(true);
    setUser({ username: 'enslit' });
    setIsLoggedIn(true);
    // return bbbsApi
    //   .login({ username, password })
    //   .then((tokens) => {
    //     localStorage.setItem(JWT_LS_KEY, JSON.stringify(tokens));
    //     return bbbsApi.getUserProfile();
    //   })
    //   .then((userData) => {
    //     setUser(userData);
    //     setLoggedIn(true);
    //   });
  };

  const signOut = (cb) => {
    // localStorage.removeItem(JWT_LS_KEY);
    // setUser(null);
    // setLoggedIn(false);
    // cb();
  };

  useEffect(() => {
    // const jwt = localStorage.getItem(JWT_LS_KEY);
    //
    // if (jwt) {
    //   bbbsApi
    //     .getUserProfile()
    //     .then((userData) => {
    //       setUser(userData);
    //       setLoggedIn(true);
    //     })
    //     .catch((error) => console.log(error))
    //     .finally(() => setAuthReady(true));
    // } else {
    //   setAuthReady(true);
    // }
  }, []);

  return { isAuthReady, isLoggedIn, user, signIn, signOut };
};
