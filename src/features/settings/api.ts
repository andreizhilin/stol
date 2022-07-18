import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from '@/services';

import { GetSettingsResponse, Settings } from './types';

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQuery({ baseUrl: api.BASE_URL }),
  tagTypes: ['Settings'],
  endpoints: builder => ({
    getSettings: builder.query<Settings, void>({
      query: () => 'settings',
      transformResponse: (response: GetSettingsResponse) => JSON.parse(response.data ?? '{}'),
      providesTags: () => [{ type: 'Settings' }],
    }),
    updateSettings: builder.mutation<Settings, Partial<Settings>>({
      query: settings => ({
        url: 'settings',
        method: 'POST',
        body: settings,
      }),
      invalidatesTags: () => [{ type: 'Settings' }],
    }),
  }),
});

export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingsApi;
