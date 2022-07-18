import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { getNotesRoutes, getSettingsRoutes, getAuthRoutes, ProtectedRoute } from '@/features';
import { BaseLayout } from '@/components';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <BaseLayout>&nbsp;</BaseLayout>
            </ProtectedRoute>
          }
        />
        {getNotesRoutes()}
        {getSettingsRoutes()}
        {getAuthRoutes()}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
