import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {
  AuthenticatedPage,
  NotepadWidget,
  NotepadSettingsWidget,
  SettingsLayout,
  SigninWidget,
  useLocalization,
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
        <Route
          path='/notepad'
          element={
            <ProtectedRoute>
              <NotepadWidget />
            </ProtectedRoute>
          }
        />
        <Route path='/settings' element={<Navigate to='/settings/notepad' />} />
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
        <Route path='/signin' element={<SigninWidget />} />
        <Route path='/authenticated' element={<AuthenticatedPage />} />
      </Routes>
    </Router>
  );
}
