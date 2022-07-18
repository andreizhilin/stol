import { Route } from 'react-router-dom';

import { AuthenticatedPage, SigninPage } from './pages';

export function getAuthRoutes() {
  return (
    <>
      <Route path='/signin' element={<SigninPage />} />
      <Route path='/authenticated' element={<AuthenticatedPage />} />
    </>
  );
}
