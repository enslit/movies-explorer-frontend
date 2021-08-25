import { FetchApi } from './FetchApi';
import {
  LoginResponse,
  LogoutResponse,
  RegisterResponse,
  UpdateUserResponse,
  UserInfo,
} from '../../types/responses/UserApiResponses';
import {
  MovieMainApiResponse,
  MoviesMainApiResponse,
} from '../../types/responses/MovieMainApiResponses';
import { MovieToSave } from '../../types/requests/MainMovieApiRequests';
import { CelebrateErrorResponse } from '../../types/responses/CelebrateErrorResponse';
import { ErrorMainApiResponse } from '../../types/responses/ErrorMainApiResponse';

type ApiErrorResponse = CelebrateErrorResponse | ErrorMainApiResponse;

export class MainApi extends FetchApi {
  auth(email: string, password: string) {
    return this._fetch<LoginResponse, ApiErrorResponse>('signin', 'POST', {
      email,
      password,
    });
  }

  register(name: string, email: string, password: string) {
    return this._fetch<RegisterResponse, ApiErrorResponse>('signup', 'POST', {
      name,
      email,
      password,
    });
  }
  logout() {
    return this._fetch<LogoutResponse, ErrorMainApiResponse>('signout', 'POST');
  }

  getUserProfile() {
    return this._fetch<UserInfo, ErrorMainApiResponse>('users/me', 'GET');
  }

  updateUserInfo(userData: { name: string; email: string }) {
    return this._fetch<UpdateUserResponse, ApiErrorResponse>(
      'users/me',
      'PATCH',
      userData
    );
  }

  getMovies() {
    return this._fetch<MoviesMainApiResponse, ErrorMainApiResponse>(
      'movies',
      'GET'
    );
  }

  saveMovie(movieData: MovieToSave) {
    return this._fetch<MovieMainApiResponse, ApiErrorResponse>(
      'movies',
      'POST',
      movieData
    );
  }

  removeMovie(movieId: string) {
    return this._fetch<MovieMainApiResponse, ErrorMainApiResponse>(
      `movies/${movieId}`,
      'DELETE'
    );
  }
}
