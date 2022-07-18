import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '@/features';

import { CommonSettingsPage, NotepadSettingsPage } from './pages';

export function getSettingsRoutes() {
  return (
    <>
      <Route
        path='/settings'
        element={
          <ProtectedRoute>
            <CommonSettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings/notepad'
        element={
          <ProtectedRoute>
            <NotepadSettingsPage />
          </ProtectedRoute>
        }
      />
    </>
  );
}
