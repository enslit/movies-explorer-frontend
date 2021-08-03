import { FetchApi } from './FetchApi';

export class AppApi extends FetchApi {
  register(name, email, password) {
    return this._fetch('signup', 'POST', { name, email, password });
  }

  auth(email, password) {
    return this._fetch('signin', 'POST', { email, password });
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
}
