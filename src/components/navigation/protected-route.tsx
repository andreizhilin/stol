import { Navigate } from 'react-router-dom';

import { useAuth } from '@/hooks';

import { Layout } from '../layout';

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Layout>{children}</Layout>;
  }

  return <Navigate to='/signin' replace />;
}
