import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import {
  AuthenticatedPage,
  CommonSettingsWidget,
  NotepadWidget,
  NotepadSettingsWidget,
  SettingsLayout,
  SigninPage,
} from '@/features';

import { ProtectedRoute } from './protected-route';

export function NavigationRouter() {
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
        <Route path='/settings' element={<Navigate to='/settings/common' />} />
        <Route
          path='/settings/common'
          element={
            <ProtectedRoute>
              <SettingsLayout>
                <CommonSettingsWidget />
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
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/authenticated' element={<AuthenticatedPage />} />
      </Routes>
    </Router>
  );
}
