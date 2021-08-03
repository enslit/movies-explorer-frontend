import React, { createContext, useContext, useEffect, useState } from 'react';
import { any } from 'prop-types';
import { appApi } from '../utils/Api/api';

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
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const signIn = ({ email, password }) => {
    return appApi
      .auth(email, password)
      .then((response) => {
        console.log(response);

        if (!response.message || response.message !== 'Авторизован') {
          throw new Error(response?.message || 'Ошибка');
        }

        return appApi.getUserProfile();
      })
      .then((userData) => {
        setUser(userData);
        setIsLoggedIn(true);
      });
  };

  const signOut = () => {
    appApi
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserProfile = (formData) => {
    return appApi
      .updateUserInfo(formData)
      .then(() => {
        setUser((prev) => ({
          ...prev,
          ...formData,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    appApi
      .getUserProfile()
      .then((response) => {
        if (response.message) {
          throw new Error(response.message);
        }

        setUser(response);
        setIsLoggedIn(true);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsAuthReady(true));
  }, []);

  return { isAuthReady, isLoggedIn, user, signIn, signOut, updateUserProfile };
};
