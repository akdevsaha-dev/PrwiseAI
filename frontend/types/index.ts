export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  firstLogin: boolean;
};

export type Session = {
  user: User;
  session: {
    id: string;
    userId: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress?: string;
    userAgent?: string;
  };
};
