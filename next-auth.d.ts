import 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: number;
    firstname?: string;
    lastname?: string;
    loginPhonenumber: string;
    accessToken: string;
    kycValid: number;
    email?: string;
    xypValid?: number;
  }

  interface Session {
    accessToken?: string;
    user: {
      firstname?: string;
      lastname?: string;
      loginPhonenumber?: string;
      kycValid?: number;
      email?: string;
      xypValid?: number;
      id: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    user: {
      firstname?: string;
      lastname?: string;
      loginPhonenumber: string;
      kycValid: number;
      email?: string;
      xypValid?: number;
      id: number;
    };
  }
}
