import { Route } from 'react-router-dom';

import { ProtectedRoute, SettingsLayout } from '@/features';
import { Layout } from '@/components';

import { NotepadWidget } from './widget';
import { NotepadSettingsWidget } from './settings';

export function getNotesRoutes() {
  return (
    <>
      <Route
        path='/notepad'
        element={
          <ProtectedRoute>
            <Layout>
              <NotepadWidget />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings/notepad'
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsLayout>
                <NotepadSettingsWidget />
              </SettingsLayout>
            </Layout>
          </ProtectedRoute>
        }
      />
    </>
  );
}
