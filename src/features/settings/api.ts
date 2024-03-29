import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryWithRetry } from '@/services/api';

import { GetSettingsResponse, Settings } from './types';

const DEFAULT_SETTINGS = {};

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ['Settings'],
  endpoints: builder => ({
    getSettings: builder.query<Settings, void>({
      query: () => 'settings',
      transformResponse: (response: GetSettingsResponse) => JSON.parse(response.data ?? null) ?? DEFAULT_SETTINGS,
      providesTags: () => [{ type: 'Settings' }],
    }),
    updateSettings: builder.mutation<Settings, Partial<Settings>>({
      query: settings => ({
        url: 'settings',
        method: 'POST',
        body: settings,
      }),
      async onQueryStarted(settings, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          settingsApi.util.updateQueryData('getSettings', undefined, draft => {
            Object.assign(draft, settings);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});
