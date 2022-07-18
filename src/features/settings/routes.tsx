import { Navigate, Route } from 'react-router-dom';

import { AppearanceSettingsWidget, LocalizationSettingsWidget, ProtectedRoute } from '@/features';
import { Layout } from '@/components';

import { SettingsLayout } from './components';

export function getSettingsRoutes() {
  return (
    <>
      <Route path='/settings' element={<Navigate to='/settings/appearance' />} />
      <Route
        path='/settings/appearance'
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsLayout>
                <AppearanceSettingsWidget />
              </SettingsLayout>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path='/settings/localization'
        element={
          <ProtectedRoute>
            <Layout>
              <SettingsLayout>
                <LocalizationSettingsWidget />
              </SettingsLayout>
            </Layout>
          </ProtectedRoute>
        }
      />
    </>
  );
}
