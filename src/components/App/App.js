import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import Loader from '../Loader/Loader';
import classNames from 'classnames';
import ProtectedRoute from '../../hocs/ProtectedRoute';
import useLocalStorage from '../../hooks/useLocalStorage';
import { appApi, moviesApi } from '../../utils/Api/api';
import Movies from '../Movies/Movies';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import {
  MOVIES_LOCAL_STORAGE_KEY,
  SAVED_MOVIES_LOCAL_STORAGE_KEY,
} from '../../utils/constants';
import CurrentUserContext from '../../context/CurrentUserContext';
import useToast from '../../hooks/useToast';

const App = () => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(
    useContext(CurrentUserContext)
  );
  const [authorized, setAuthorized] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [movies, setMovies] = useLocalStorage(MOVIES_LOCAL_STORAGE_KEY, []);
  const [savedMovies, setSavedMovies] = useLocalStorage(
    SAVED_MOVIES_LOCAL_STORAGE_KEY,
    []
  );
  const [isFetching, setIsFetching] = useState(true);
  const toast = useToast();

  const errorHandler = (error) => {
    console.error('error', error.message);
    toast(error.message);
  };

  const onSave = (movie) => {
    const prepare = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      trailer: movie.trailerLink,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    };

    appApi
      .saveMovie(prepare)
      .then((response) => {
        if (response?.bodyError) {
          throw new Error(
            response.bodyError.map((error) => error.message).toString()
          );
        }

        setSavedMovies((prevState) => [...prevState, response]);
      })
      .catch(errorHandler);
  };

  const onRemove = (id) => {
    appApi
      .removeMovie(id)
      .then(() => {
        setSavedMovies((prevState) =>
          prevState.filter((movie) => movie._id !== id)
        );
      })
      .catch(errorHandler);
  };

  const onSignIn = ({ email, password }) => {
    return appApi
      .auth(email, password)
      .then((response) => {
        if (!response.message || response.message !== 'Авторизован') {
          throw new Error(response?.message || 'Ошибка');
        }

        return appApi.getUserProfile();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setAuthorized(true);
      });
  };

  const onSignUp = ({ name, email, password }) => {
    return appApi.register(name, email, password).then((response) => {
      if (response?.message) {
        throw new Error(response.message);
      }
      setCurrentUser(response);
      setAuthorized(true);
      history.push('/movies');
    });
  };

  const onSignOut = () => {
    appApi
      .logout()
      .then(() => {
        setMovies([]);
        setSavedMovies([]);
        setAuthorized(false);
        setCurrentUser(null);
      })
      .catch(errorHandler);
  };

  const onUpdateUserProfile = (formData) => {
    return appApi.updateUserInfo(formData).then((response) => {
      if (response?.message) {
        throw new Error(response.message);
      }

      if (response?.bodyError) {
        throw new Error(
          response.bodyError.map((error) => error.message).toString()
        );
      }

      setCurrentUser((prev) => ({
        ...prev,
        ...formData,
      }));
    });
  };

  useEffect(() => {
    const requests = [];

    if (authorized) {
      if (movies.length === 0) {
        const request = moviesApi
          .getMovies()
          .then((movies) => setMovies(movies));

        requests.push(request);
      }

      if (savedMovies.length === 0) {
        const request = appApi
          .getMovies()
          .then((result) => setSavedMovies(result.movies));

        requests.push(request);
      }
    }

    if (requests.length > 0) {
      Promise.all(requests)
        .catch(errorHandler)
        .finally(() => {
          setAppReady(true);
          setIsFetching(false);
        });
    } else {
      setAppReady(true);
      setIsFetching(false);
    }
  }, [authorized]);

  useEffect(() => {
    setMovies((prev) => {
      return prev.map((movie) => {
        const savedMovie = savedMovies.find(
          ({ movieId }) => +movieId === movie.id
        );

        return {
          ...movie,
          isSaved: !!savedMovie,
          ...(savedMovie ? { _id: savedMovie._id } : {}),
        };
      });
    });
  }, [savedMovies, setMovies]);

  useEffect(() => {
    appApi
      .getUserProfile()
      .then((response) => {
        if (response.message) {
          throw new Error(response.message);
        }

        setCurrentUser(response);
        setAuthorized(true);
      })
      .catch(({ message }) => {
        console.info(message);
      })
      .finally(() => setAuthReady(true));
  }, []);

  const appClasses = classNames('app', {
    app_loading: !appReady || !authReady,
  });

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        authorized,
      }}
    >
      <div className={appClasses}>
        {appReady && authReady ? (
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              path="/movies"
              list={movies}
              onSave={onSave}
              isFetching={isFetching}
              initialized={appReady}
              onRemove={onRemove}
            >
              <Movies
                list={movies}
                onSave={onSave}
                onRemove={onRemove}
                isFetching={isFetching}
                initialized={appReady}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/saved-movies">
              <SavedMovies
                list={savedMovies}
                isFetching={isFetching}
                initialized={appReady}
                onRemove={onRemove}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/profile">
              <Profile
                handleSignOut={onSignOut}
                handleUpdateProfile={onUpdateUserProfile}
              />
            </ProtectedRoute>
            <ProtectedRoute path="/signin" denyAuthUser={true}>
              <Login handleSignIn={onSignIn} />
            </ProtectedRoute>
            <ProtectedRoute path="/signup" denyAuthUser={true}>
              <Register handleSignUp={onSignUp} />
            </ProtectedRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        ) : (
          <Loader />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
