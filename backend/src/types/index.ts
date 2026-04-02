export type Session = {
  user: {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    createdAt: Date;
    updatedAt: Date;
    emailVerified: boolean;
    firstLogin: boolean;
  };
  session: {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
};
