import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

type UserId = string;

declare module 'next-auth/jwt' {
  interface JWT {
    username: string;
  }
}

declare module 'next-auth' {
  interface User {
    username?: string | null;
  }
  interface Session {
    user: User & {
      username?: string | null;
    };
  }
}
