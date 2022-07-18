export type Auth = {
  userId: string | null;
  isDemo: boolean;
};

export type AuthorizeResponse = {
  data: Auth;
};
