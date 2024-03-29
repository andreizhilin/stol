import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authApi, notesApi, settingsApi, remindersApi } from '@/features';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [remindersApi.reducerPath]: remindersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(notesApi.middleware)
      .concat(authApi.middleware)
      .concat(settingsApi.middleware)
      .concat(remindersApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
