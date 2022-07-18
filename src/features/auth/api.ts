import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryWithRetry } from '@/services/api';

import { AuthorizeResponse, Auth, AuthenticateRequest } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQueryWithRetry,
  endpoints: builder => ({
    authenticate: builder.mutation<void, AuthenticateRequest>({
      query: data => ({
        url: 'authenticate',
        method: 'POST',
        body: { data },
      }),
    }),
    authorize: builder.query<Auth, void>({
      query: () => 'authorize',
      transformResponse: (response: AuthorizeResponse) => response.data,
    }),
  }),
});
