import { authApi } from './api';

export const { useAuthenticateMutation, useAuthorizeQuery } = authApi;

export function useAuth() {
  const { data, isLoading } = useAuthorizeQuery();
  return { isAuthenticated: !!data?.userId, userId: data?.userId, isDemo: data?.isDemo, isLoading };
}
