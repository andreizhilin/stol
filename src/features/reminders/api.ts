import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryWithRetry } from '@/services/api';

import { Reminder, FetchRemindersResponse, UpdateReminderResponse } from './types';

export const remindersApi = createApi({
  reducerPath: 'remindersApi',
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ['Reminders'],
  endpoints: builder => ({
    fetchReminders: builder.query<Reminder[], void>({
      query: () => 'reminders',
      transformResponse: (response: FetchRemindersResponse) =>
        response.data.sort((r1, r2) => r1.text.localeCompare(r2.text)),
      providesTags: () => [{ type: 'Reminders' }],
    }),
    updateReminder: builder.mutation<UpdateReminderResponse, Omit<Reminder, 'id'>>({
      query: reminder => ({
        url: 'reminders',
        method: 'POST',
        body: reminder,
      }),
      async onQueryStarted(reminder, { dispatch, queryFulfilled }) {
        const { data: response } = await queryFulfilled;
        dispatch(
          remindersApi.util.updateQueryData('fetchReminders', undefined, draftReminders => {
            draftReminders.push(response.data);
          }),
        );
      },
    }),
    deleteReminder: builder.mutation<undefined, Pick<Reminder, 'id'>>({
      query: reminder => ({
        url: 'reminder',
        method: 'DELETE',
        body: reminder,
      }),
      async onQueryStarted(reminder, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          remindersApi.util.updateQueryData('fetchReminders', undefined, draftReminders => {
            return draftReminders.filter(draftReminder => draftReminder.id !== reminder.id);
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
