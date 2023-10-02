import { getError } from '@/utils/api-error';
import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, refreshToken, register, resetPassword } from './api/auth';

// eslint-disable-next-line no-unused-vars
async function refreshAccessToken(token: any) {
   try {
      const res = await refreshToken(token.refreshToken);
      if (res.status === 200) {
         return {
            ...token,
            accessToken: res.data.body?.accessToken,
            accessTokenExpires: Date.now() + res.data.body?.expires_in! * 1000
         };
      }
   } catch (error) {
      throw new Error(getError(error));
   }
}

export const authOptions: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   providers: [
      CredentialsProvider({
         id: 'Credentials',
         name: 'Credentials',
         type: 'credentials',
         credentials: {
            email: {
               label: 'Email',
               type: 'text',
               placeholder: 'email'
            },
            password: { label: 'Password', type: 'password' },
            otp: { label: 'OTP', type: 'text' },
            token: { label: 'Token', type: 'text' },
            resetKey: { label: 'Reset Key', type: 'text' }
         },
         async authorize(credentials) {
            if (credentials?.resetKey) {
               try {
                  const res = await resetPassword({
                     newPassword: credentials.password,
                     uid: credentials.resetKey
                  });
                  if (res.status === 200) {
                     return {
                        id: 'fake_id',
                        accessToken: res.data.body?.accessToken!,
                        refreshToken: res.data.body?.refreshToken!,
                        accessTokenExpires: res.data.body?.expires_in!
                     };
                  }
               } catch (error) {
                  throw new Error(getError(error));
               }
            }

            if (credentials?.otp) {
               if (credentials?.email && credentials?.password) {
                  try {
                     const res = await register({
                        email: credentials.email,
                        password: credentials.password,
                        otpCode: credentials.otp,
                        token: credentials.token
                     });
                     if (res.status === 200) {
                        return {
                           id: 'fake_id',
                           accessToken: res.data.body?.accessToken!,
                           refreshToken: res.data.body?.refreshToken!,
                           accessTokenExpires: res.data.body?.expires_in!
                        };
                     }
                  } catch (error) {
                     throw new Error(getError(error));
                  }
               }
            }

            if (credentials?.email && credentials?.password) {
               try {
                  const res = await login(credentials);

                  if (res.status === 200) {
                     return {
                        id: 'fake_id',
                        accessToken: res.data.body?.accessToken!,
                        accessTokenExpires: res.data.body?.expires_in!,
                        refreshToken: res.data.body?.refreshToken!
                     };
                  }
               } catch (error) {
                  console.log(error);
                  throw new Error(getError(error));
               }
            }
            return null;
         }
      })
   ],
   session: {
      strategy: 'jwt',
      maxAge: 24 * 60 * 60 // 24 hours
   },
   callbacks: {
      async jwt({ token, user }) {
         if (user) {
            token.accessToken = user.accessToken;
            token.refreshToken = user.refreshToken;
            token.accessTokenExpires = user.accessTokenExpires;
            return token;
         }

         if (Date.now() + 8 * 60 * 60 * 1000 < Number(token.accessTokenExpires)) {
            return token;
         }

         return await refreshAccessToken(token);
      },

      async session({ session, token }) {
         if (token) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;
         }

         return session;
      }
   },
   pages: {
      signIn: '/auth/login',
      error: '/auth/login'
   }
};

export const getCurrentUser = async () => {
   const session = await getServerSession(authOptions);
   return session;
};
