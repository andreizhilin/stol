import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import type { FetchArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';

export const BASE_URL = '/api';

export const fetchBaseQueryWithRetry = retry(
  async (args: string | FetchArgs, api, extraOptions) => {
    const result = await fetchBaseQuery({ baseUrl: BASE_URL })(args, api, extraOptions);

    // only retry on server error
    if (result?.error?.status && result.error?.status < 500) {
      retry.fail(result.error);
    }

    return result;
  },
  {
    maxRetries: 3,
  },
);
