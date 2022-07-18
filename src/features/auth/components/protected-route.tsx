import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth, useGetSettingsQuery } from '@/features';
import { HeaderSkeleton } from '@/components';

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isLoading: areSettingsLoading } = useGetSettingsQuery();

  if (isAuthLoading || areSettingsLoading) {
    return <HeaderSkeleton />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to='/signin' replace />;
}
