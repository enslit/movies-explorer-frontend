type Options = {
  baseUrl: string;
  credentials?: RequestCredentials;
  headers?: {
    [header: string]: string;
  };
};

type FetchOptions = {
  method: string;
  headers: HeadersInit;
  credentials: RequestCredentials;
  SameSite: string;
  body?: string;
};

export class FetchApi {
  private readonly _baseUrl: string;
  private readonly _headers: HeadersInit | undefined;
  private readonly _credentials: RequestCredentials;

  constructor(options: Options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._credentials = options.credentials || 'same-origin';
  }

  _fetch<SuccessResponse, ErrorResponse>(
    url: string,
    method = 'GET',
    body: Record<string, any> | null = null,
    additionalHeaders = {}
  ): Promise<SuccessResponse | ErrorResponse> {
    const fetchUrl = `${this._baseUrl}/${url}`;
    const fetchOptions: FetchOptions = {
      method,
      headers: Object.assign(this._headers, additionalHeaders),
      credentials: this._credentials,
      SameSite: 'None',
    };

    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(fetchUrl, fetchOptions).then((res) => res.json());
  }
}
