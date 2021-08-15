export class FetchApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials || 'same-origin';
  }

  _fetch(url, method = 'GET', body = null, additionalHeaders = {}) {
    const fetchUrl = `${this._baseUrl}/${url}`;
    const options = {
      method,
      headers: Object.assign(this._headers, additionalHeaders),
      credentials: this._credentials,
      SameSite: 'None',
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(fetchUrl, options).then((res) => res.json());
  }
}
