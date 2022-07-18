import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '@/features';

import { NotepadPage } from './pages';

export function getNotesRoutes() {
  return (
    <>
      <Route
        path='/notepad'
        element={
          <ProtectedRoute>
            <NotepadPage />
          </ProtectedRoute>
        }
      />
    </>
  );
}
