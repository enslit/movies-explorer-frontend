import { CelebrateErrorResponse } from '../types/responses/CelebrateErrorResponse';
import { ErrorMainApiResponse } from '../types/responses/ErrorMainApiResponse';

export const mainApiResponseHandler =
  <T>() =>
  (response: T | CelebrateErrorResponse | ErrorMainApiResponse): T => {
    if ('celebrateError' in response) {
      throw new Error(
        response.bodyError
          .map((error: { message: string }) => error.message)
          .toString()
      );
    }

    if ('message' in response) {
      throw new Error(response.message);
    }

    return response;
  };
