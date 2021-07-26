import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import classNames from 'classnames';
import withHeaderAndFooter from '../../hocs/withHeaderAndFooter';
import withHeader from '../../hocs/withHeader';

const App = () => {
  const { isAuthReady, isLoggedIn, signIn } = useAuth();

  const getProtectedAuthRoute = (path, component, denyAuthUser = false) => {
    return (!denyAuthUser && isLoggedIn) || (denyAuthUser && !isLoggedIn) ? (
      <Route path={path} component={component} exact />
    ) : (
      <Redirect path={path} to={denyAuthUser ? '/' : '/signin'} exact />
    );
  };

  useEffect(() => {
    signIn({ username: 'enslit', password: '123' });
  }, []);

  useEffect(() => {
    console.log('isAuthReady');
  }, [isAuthReady]);

  const appClasses = classNames('app', { app_loading: !isAuthReady });

  return (
    <div className={appClasses}>
      {isAuthReady ? (
        <Switch>
          <Route exact path="/" component={withHeaderAndFooter(Main)} />
          {getProtectedAuthRoute('/movies', withHeaderAndFooter(Movies))}
          {getProtectedAuthRoute(
            '/saved-movies',
            withHeaderAndFooter(SavedMovies)
          )}
          {getProtectedAuthRoute('/profile', withHeader(Profile))}
          {getProtectedAuthRoute('/signin', Login, true)}
          {getProtectedAuthRoute('/signup', Register, true)}
          <Route path="*" component={NotFound} />
        </Switch>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
