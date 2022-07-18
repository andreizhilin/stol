import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { api } from '@/services';

import { FetchNotesResponse, GetNoteByDateResponse, Note } from './types';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: api.BASE_URL }),
  endpoints: builder => ({
    fetchNotes: builder.query<Note[], undefined>({
      query: () => 'notes',
      transformResponse: (response: FetchNotesResponse) => response.data,
    }),
    getNoteByDate: builder.query<Note, string>({
      query: dateString => `note?date=${dateString}`,
      transformResponse: (response: GetNoteByDateResponse) => response.data,
    }),
    updateNote: builder.mutation<void, Note>({
      query: note => ({
        url: 'notes',
        method: 'POST',
        body: note,
      }),
    }),
  }),
});

export const { useFetchNotesQuery, useGetNoteByDateQuery, useUpdateNoteMutation } = notesApi;
