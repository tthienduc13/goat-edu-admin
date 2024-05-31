import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { login } from './app/api/auth/auth.api';
import { LoginSchema } from './schemas';

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'text'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        try {
          const validatedFields = LoginSchema.safeParse(credentials);
          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const response = await login({
              email: email,
              password: password
            });
            const user = response.data;
            if (user) {
              if (user.role.roleName === 'Admin') {
                return user;
              }
            } else {
              return null;
            }
          }
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.fullname = user.fullname;
        token.emailVerify = user.emailVerify;
        token.role = user.role;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.userId;
        session.user.username = token.username;
        session.user.name = token.fullname;
        session.user.emailVerify = token.emailVerify;
        session.user.role = token.role;
        session.user.token = token.token;
        session.user.fullname = token.fullname;
      }
      return session;
    }
  },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 24 * 7 },
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
