import { Navigate } from 'react-router-dom';

import { useAuth } from '@/features';

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to='/signin' replace />;
}
