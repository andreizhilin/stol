import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {
  AuthenticatedPage,
  NotepadWidget,
  NotepadSettingsWidget,
  SettingsLayout,
  SigninWidget,
  useLocalization,
  LocalizationSettingsWidget,
  AppearanceSettingsWidget,
} from '@/features';

import { ProtectedRoute } from './protected-route';

export function NavigationRouter() {
  useLocalization();

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <NotepadWidget />
            </ProtectedRoute>
          }
        />
        {/* Features */}
        <Route
          path='/notepad'
          element={
            <ProtectedRoute>
              <NotepadWidget />
            </ProtectedRoute>
          }
        />
        {/* Settings */}
        <Route path='/settings' element={<Navigate to='/settings/notepad' />} />
        <Route
          path='/settings/appearance'
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <AppearanceSettingsWidget />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings/localization'
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <LocalizationSettingsWidget />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings/notepad'
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <NotepadSettingsWidget />
              </SettingsLayout>
            </ProtectedRoute>
          }
        />
        {/* Auth */}
        <Route path='/signin' element={<SigninWidget />} />
        <Route path='/authenticated' element={<AuthenticatedPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
