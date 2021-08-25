import { FetchApi } from './FetchApi';
import { MovieResponseBeatfilm } from '../../types/responses/BeatFilmApiResponses';

class MoviesApi extends FetchApi {
  getMovies() {
    return this._fetch<MovieResponseBeatfilm[], { message: string }>('', 'GET');
  }
}

export default MoviesApi;
