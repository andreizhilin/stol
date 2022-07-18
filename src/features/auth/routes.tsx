import { Route } from 'react-router-dom';

import { AuthenticatedPage } from './components';
import { SigninWidget } from './widget';

export function getAuthRoutes() {
  return (
    <>
      <Route path='/signin' element={<SigninWidget />} />
      <Route path='/authenticated' element={<AuthenticatedPage />} />
    </>
  );
}
