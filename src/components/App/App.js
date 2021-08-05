import React, { lazy, Suspense } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import ProtectedRoute from '../../hocs/ProtectedRoute';

const App = () => {
  const { isAuthReady } = useAuth();

  const components = {
    Main: lazy(() => import('../Main/Main')),
    Movies: lazy(() => import('../Movies/Movies')),
    SavedMovies: lazy(() => import('../SavedMovies/SavedMovies')),
    Profile: lazy(() => import('../Profile/Profile')),
    Login: lazy(() => import('../Login/Login')),
    Register: lazy(() => import('../Register/Register')),
    NotFound: lazy(() => import('../NotFound/NotFound')),
  };

  const FallbackLoadingComponent = () => {
    const styles = {
      height: '100vh',
      weight: '100%',
      display: 'grid',
      placeContent: 'center',
    };

    return (
      <div style={styles}>
        <Loader />
      </div>
    );
  };

  const appClasses = classNames('app', { app_loading: !isAuthReady });

  return (
    <div className={appClasses}>
      {isAuthReady ? (
        <Suspense fallback={<FallbackLoadingComponent />}>
          <Switch>
            <Route exact path="/" component={components.Main} />
            <ProtectedRoute path="/movies" component={components.Movies} />
            <ProtectedRoute
              path="/saved-movies"
              component={components.SavedMovies}
            />
            <ProtectedRoute path="/profile" component={components.Profile} />
            <ProtectedRoute
              path="/signin"
              component={components.Login}
              denyAuthUser={true}
            />
            <ProtectedRoute
              path="/signup"
              component={components.Register}
              denyAuthUser={true}
            />
            <Route path="*" component={components.NotFound} />
          </Switch>
        </Suspense>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default App;
