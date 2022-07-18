import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {
  getNotesRoutes,
  getSettingsRoutes,
  getAuthRoutes,
  getRemindersRoutes,
  ProtectedRoute,
  NotepadPage,
} from '@/features';
import { BaseLayout } from '@/components';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <BaseLayout>
                <NotepadPage />
              </BaseLayout>
            </ProtectedRoute>
          }
        />
        {getAuthRoutes()}
        {getNotesRoutes()}
        {getRemindersRoutes()}
        {getSettingsRoutes()}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
