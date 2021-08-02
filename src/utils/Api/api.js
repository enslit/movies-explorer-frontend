import { AppApi } from './AppApi';

export const appApi = new AppApi({
  baseUrl: 'https://api.enslit-movies.nomoredomains.club/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
