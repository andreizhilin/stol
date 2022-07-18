import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { getNotesRoutes, getSettingsRoutes, getAuthRoutes } from '@/features';

export function NavigationRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/notepad' />} />
        {getNotesRoutes()}
        {getSettingsRoutes()}
        {getAuthRoutes()}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}
