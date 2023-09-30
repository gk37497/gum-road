import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login, register } from './api/auth';

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
            token: { label: 'Token', type: 'text' }
         },
         async authorize(credentials) {
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
                           accessToken: res.data.body?.accessToken!
                        };
                     }
                  } catch (error) {
                     throw new Error(error?.toString());
                  }
               }
            } else {
               if (credentials?.email && credentials?.password) {
                  try {
                     const res = await login(credentials);
                     if (res.status === 200) {
                        return {
                           id: 'fake_id',
                           accessToken: res.data.body?.accessToken!
                        };
                     }
                  } catch (error) {
                     throw new Error('Invalid credentials');
                  }
               }
            }
            return null;
         }
      })
   ],
   session: {
      strategy: 'jwt'
   },
   callbacks: {
      // TODO refresh token
      async jwt({ token, user }) {
         if (user) {
            token.accessToken = user.accessToken;
         }

         return token;
      },

      session({ session, token }) {
         if (token) {
            session.accessToken = token.accessToken;
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
