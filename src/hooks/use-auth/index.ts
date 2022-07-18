import { useAuthorizeQuery } from '@/features';

export function useAuth() {
  const { data, isLoading } = useAuthorizeQuery();
  return { isAuthenticated: !!data?.userId, userId: data?.userId, isDemo: data?.isDemo, isLoading };
}
