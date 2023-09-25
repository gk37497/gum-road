declare namespace NodeJS {
   export interface ProcessEnv {
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_BASIC_AUTH_TOKEN: string;
   }
}
