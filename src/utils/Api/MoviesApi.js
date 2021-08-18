import { FetchApi } from './FetchApi';

class MoviesApi extends FetchApi {
  getMovies() {
    return this._fetch('', 'GET');
  }
}

export default MoviesApi;
