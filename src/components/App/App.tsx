import { useContext, useEffect, useState } from 'react';
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
  APP_NAME,
  MOVIES_LOCAL_STORAGE_KEY,
  SAVED_MOVIES_LOCAL_STORAGE_KEY,
} from '../../utils/constants';
import CurrentUserContext, {
  initialCurrentUserValue,
} from '../../context/CurrentUserContext';
import useToast from '../../hooks/useToast';
import { MovieResponseBeatfilm } from '../../types/responses/BeatFilmApiResponses';
import { MovieToSave } from '../../types/requests/MainMovieApiRequests';
import {
  LoginResponse,
  RegisterResponse,
  UpdateUserResponse,
  UserInfo,
} from '../../types/responses/UserApiResponses';
import {
  MovieMainApiResponse,
  MoviesMainApiResponse,
} from '../../types/responses/MovieMainApiResponses';
import { MergedMovie } from '../../types/MergedMovie';
import { mainApiResponseHandler } from '../../utils/mainApiResponseHandler';
import {
  LoginFormData,
  RegisterFormData,
  UserFormData,
} from '../../types/requests/UserApiRequests';

const App = (): JSX.Element => {
  const history = useHistory<History>();
  const userContext = useContext(CurrentUserContext);
  const [currentUser, setCurrentUser] = useState<UserInfo>(
    userContext.currentUser
  );
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [appReady, setAppReady] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [movies, setMovies] = useLocalStorage<MovieResponseBeatfilm[]>(
    MOVIES_LOCAL_STORAGE_KEY,
    []
  );
  const [savedMovies, setSavedMovies] = useLocalStorage<MovieMainApiResponse[]>(
    SAVED_MOVIES_LOCAL_STORAGE_KEY,
    []
  );
  const [mergedMoviesData, setMergedMoviesData] = useState<MergedMovie[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const toast = useToast();

  const errorHandler = (error: Error) => {
    console.error('error', error.message);
    toast(error.message);
  };

  const onSave = (movie: MovieResponseBeatfilm) => {
    const prepare: MovieToSave = {
      country: movie.country || 'Unknown',
      director: movie.director || 'Unknown',
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      trailer: movie.trailerLink || '#',
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN || '',
    };

    appApi
      .saveMovie(prepare)
      .then(mainApiResponseHandler<MovieMainApiResponse>())
      .then((response) => {
        setSavedMovies((prevState) => [...prevState, response]);
      })
      .catch(errorHandler);
  };

  const onRemove = (id: string) => {
    appApi
      .removeMovie(id)
      .then(mainApiResponseHandler<MovieMainApiResponse>())
      .then(() => {
        setSavedMovies((prevState) =>
          prevState.filter((movie) => movie._id !== id)
        );
      })
      .catch(errorHandler);
  };

  const onSignIn = ({ email, password }: LoginFormData): Promise<void> => {
    return appApi
      .auth(email, password)
      .then(mainApiResponseHandler<LoginResponse>())
      .then((response) => {
        setCurrentUser(response.data);
        setAuthorized(true);
      });
  };

  const onSignUp = ({
    name,
    email,
    password,
  }: RegisterFormData): Promise<void> => {
    return appApi
      .register(name, email, password)
      .then(mainApiResponseHandler<RegisterResponse>())
      .then((response) => {
        setCurrentUser(response.data);
        setAuthorized(true);
        history.push('/movies');
      });
  };

  const onSignOut = (): void => {
    appApi
      .logout()
      .then(() => {
        setMovies([]);
        setSavedMovies([]);
        localStorage.removeItem(
          `${APP_NAME}-${SAVED_MOVIES_LOCAL_STORAGE_KEY}-search`
        );
        localStorage.removeItem(
          `${APP_NAME}-${MOVIES_LOCAL_STORAGE_KEY}-search`
        );
        setAuthorized(false);
        setCurrentUser(initialCurrentUserValue);
      })
      .catch(errorHandler);
  };

  const onUpdateUserProfile = (formData: UserFormData): Promise<void> => {
    return appApi
      .updateUserInfo(formData)
      .then(mainApiResponseHandler<UpdateUserResponse>())
      .then(() => {
        setCurrentUser((prev) => ({
          ...prev,
          ...formData,
        }));
      });
  };

  const createRequests = (): Promise<any>[] => {
    const requests: Promise<any>[] = [];

    if (movies.length === 0) {
      requests.push(
        moviesApi
          .getMovies()
          .then(mainApiResponseHandler<MovieResponseBeatfilm[]>())
          .then((movies) => setMovies(movies))
      );
    }

    if (savedMovies.length === 0) {
      requests.push(
        appApi
          .getMovies()
          .then(mainApiResponseHandler<MoviesMainApiResponse>())
          .then((result) => {
            setSavedMovies(result);
          })
      );
    }

    return requests;
  };

  useEffect(() => {
    const requests: Promise<any>[] = authorized ? createRequests() : [];

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
    const mergedMoviesList: MergedMovie[] = movies.map((movie) => {
      const savedMovie = savedMovies.find(
        ({ movieId }) => +movieId === +movie.id
      );

      return {
        ...movie,
        isSaved: !!savedMovie,
        ...(savedMovie ? { _id: savedMovie._id } : {}),
      };
    });

    setMergedMoviesData(mergedMoviesList);
  }, [savedMovies, movies]);

  useEffect(() => {
    appApi
      .getUserProfile()
      .then(mainApiResponseHandler<UserInfo>())
      .then((response) => {
        setCurrentUser(response);
        setAuthorized(true);
      })
      .catch(({ message }) => {
        console.info(message);
      })
      .finally(() => setAuthReady(true));
  }, []);

  const appClasses: string = classNames('app', {
    app_loading: !appReady || !authReady,
  });

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
                list={mergedMoviesData}
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
