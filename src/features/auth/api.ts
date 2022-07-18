import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from '@/services';

import { AuthorizeResponse, Auth } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: api.BASE_URL }),
  endpoints: builder => ({
    authenticate: builder.mutation<void, string>({
      query: accessToken => ({
        url: 'authenticate',
        method: 'POST',
        body: { data: accessToken },
      }),
    }),
    authorize: builder.query<Auth, void>({
      query: () => 'authorize',
      transformResponse: (response: AuthorizeResponse) => response.data,
    }),
  }),
});
