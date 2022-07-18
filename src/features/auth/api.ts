import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from '@/services';

import { AuthorizeResponse, Auth, AuthenticateRequest } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: api.BASE_URL }),
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
