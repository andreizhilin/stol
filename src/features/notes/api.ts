import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from '@/services';

import { GetNoteByDateResponse, Note } from './types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: api.BASE_URL }),
  tagTypes: ['Notes'],
  endpoints: builder => ({
    getNoteByDate: builder.query<Note, string>({
      query: dateString => `note?date=${dateString}`,
      transformResponse: (response: GetNoteByDateResponse) => response.data,
      providesTags: note => [{ type: 'Notes', date: note?.date }],
    }),
    updateNote: builder.mutation<Note, Note>({
      query: note => ({
        url: 'notes',
        method: 'POST',
        body: note,
      }),
      transformResponse: (response: GetNoteByDateResponse) => response.data,
      invalidatesTags: note => [{ type: 'Notes', date: note?.date }],
    }),
  }),
});

export const { useGetNoteByDateQuery, useUpdateNoteMutation } = notesApi;
