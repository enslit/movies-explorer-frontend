import { FetchApi } from './FetchApi';

export class MainApi extends FetchApi {
  auth(email, password) {
    return this._fetch('signin', 'POST', { email, password });
  }

  register(name, email, password) {
    return this._fetch('signup', 'POST', { name, email, password });
  }

  logout() {
    return this._fetch('signout', 'POST');
  }

  getUserProfile() {
    return this._fetch('users/me', 'GET');
  }

  updateUserInfo(userData) {
    return this._fetch('users/me', 'PATCH', userData);
  }

  getMovies() {
    return this._fetch('movies', 'GET');
  }

  saveMovie(movieData) {
    return this._fetch('movies', 'POST', movieData);
  }

  removeMovie(movieId) {
    return this._fetch(`movies/${movieId}`, 'DELETE');
  }
}
