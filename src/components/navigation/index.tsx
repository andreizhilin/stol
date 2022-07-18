import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { NotepadPage, SigninPage } from '@/features';

import { ProtectedRoute } from './protected-route';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <NotepadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/notepad'
          element={
            <ProtectedRoute>
              <NotepadPage />
            </ProtectedRoute>
          }
        />
        <Route path='/signin' element={<SigninPage />} />
      </Routes>
    </Router>
  );
}
