import React from 'react';
import { Navigate } from 'react-router-dom';

import { useGetSettingsQuery } from '@/features';
import { Header } from '@/components';

import { useAuth } from '../hooks';

type Props = {
  children: JSX.Element;
};

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isLoading: areSettingsLoading } = useGetSettingsQuery();

  if (isAuthLoading || areSettingsLoading) {
    return <Header.Skeleton />;
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to='/signin' replace />;
}
