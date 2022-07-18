import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthenticateMutation } from '../hooks';

export function AuthenticatedPage() {
  const [authenticate, { isError, isSuccess }] = useAuthenticateMutation();

  const accessToken = /access_token=([^&]+)/.exec(document.location.hash)?.[1] ?? '';
  const expiresIn = /expires_in=([^&]+)/.exec(document.location.hash)?.[1] ?? 0;

  useEffect(() => {
    authenticate({ accessToken, expiresIn: Number(expiresIn) });
  }, [accessToken, expiresIn, authenticate]);

  if (isError || isSuccess) {
    return <Navigate to='/' />;
  }

  return null;
}
