import { MainApi } from './MainApi';
import MoviesApi from './MoviesApi';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const appApi = new MainApi({
  baseUrl: 'https://api.enslit.ru/api',
  headers: defaultHeaders,
  credentials: 'include',
});

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: defaultHeaders,
});
