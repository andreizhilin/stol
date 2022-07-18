import React from 'react';
import { Route } from 'react-router-dom';

import { ProtectedRoute } from '@/features';
import { BaseLayout } from '@/components';

import { RemindersPage } from './pages';

export function getRemindersRoutes() {
  return (
    <>
      <Route
        path='/reminders'
        element={
          <ProtectedRoute>
            <BaseLayout>
              <RemindersPage />
            </BaseLayout>
          </ProtectedRoute>
        }
      />
    </>
  );
}
