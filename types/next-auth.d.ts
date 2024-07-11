import NextAuth, { DefaultSession } from 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { Role } from './role';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
  }

  interface User extends DefaultUser {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId: string;
    username: string;
    fullname: string;
    emailVerify: boolean;
    role: Role;
    token: string;
  }
}
declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: UserSession;
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
