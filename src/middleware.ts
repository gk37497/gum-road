import { withAuth } from 'next-auth/middleware';

export default withAuth({
   callbacks: {
      authorized: ({ token }) => !!token
   },
   pages: {
      signIn: '/auth/login',
      error: '/auth/login'
   },
   secret: process.env.NEXTAUTH_SECRET
});

export const config = {
   matcher: ['/dashboard/:path*']
};
