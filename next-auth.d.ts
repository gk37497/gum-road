/* eslint-disable no-unused-vars */
import 'next-auth/jwt';

declare module 'next-auth' {
   /**
    * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
    */
   interface User {
      accessToken: string;
      refreshToken: string;
      accessTokenExpires: number;
   }

   interface Session {
      accessToken?: string;
      refreshToken?: string;
      user: {
         accessToken: string;
         refreshToken: string;
      };
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      accessToken?: string;
      refreshToken: string;
      accessTokenExpires: number;
      user: {
         accessToken: string;
      };
   }
}
