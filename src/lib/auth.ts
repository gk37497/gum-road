import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./api/auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          const res = await login(credentials);
          if (res.status === 200) {
            return res.data.body.token;
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
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
    },
  },

  //   pages: {
  //     signIn: '/auth/login',
  //     error: '/auth/verify',
  //   },
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
