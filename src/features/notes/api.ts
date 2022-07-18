import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryWithRetry } from '@/services/api';

import { GetNoteByDateResponse, Note } from './types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQueryWithRetry,
  tagTypes: ['Note'],
  endpoints: builder => ({
    getNoteByDate: builder.query<Note, string>({
      query: dateString => `note?date=${dateString}`,
      transformResponse: (response: GetNoteByDateResponse) => response.data,
      providesTags: note => [{ type: 'Note', id: note?.id }],
    }),
    updateNote: builder.mutation<Note, Note>({
      query: note => ({
        url: 'notes',
        method: 'POST',
        body: note,
      }),
      transformResponse: (response: GetNoteByDateResponse) => response.data,
    }),
  }),
});
