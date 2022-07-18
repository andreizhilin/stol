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
      async onQueryStarted(note, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          if (!note.id) {
            dispatch(notesApi.util.invalidateTags([{ type: 'Note', id: undefined }]));
          }
        } catch {
          // TODO: Handle error
        }
      },
      transformResponse: (response: GetNoteByDateResponse) => response.data,
    }),
  }),
});
