import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthenticateMutation } from './api';

export function AuthenticatedPage() {
  const [authenticate, { isError, isSuccess }] = useAuthenticateMutation();

  const accessToken = /access_token=([^&]+)/.exec(document.location.hash)?.[1];

  useEffect(() => {
    authenticate(accessToken ?? '');
  }, [accessToken, authenticate]);

  if (isError || isSuccess) {
    return <Navigate to='/' />;
  }

  return null;
}
