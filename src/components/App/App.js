import React, { useEffect, useMemo } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useAuth } from '../../hooks/useAuth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const App = () => {
  const { isLoggedIn, signIn } = useAuth();

  const routes = useMemo(() => {
    return isLoggedIn ? (
      <>
        <Route path="/profile" component={Profile} />
        <Route path="/saved-movies" component={SavedMovies} />
        <Route path="/movies" component={Movies} />
        <Route path="/" component={Main} />
      </>
    ) : (
      <>
        <Route path="/signin" component={Login} />
        <Route path="/signup" component={Register} />
        <Redirect to="/signin" />
      </>
    );
  }, [isLoggedIn]);

  useEffect(() => {
    signIn('alex@enslit.ru');
  }, [signIn]);

  return (
    <div className="App">
      <Header />
      <Switch>{routes}</Switch>
      <Footer />
    </div>
  );
};

export default App;
