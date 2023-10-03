import QueryProvider from '@/components/react-query-providert';
import AuthProvider from '@/components/session-provider';
import StoreProvider from '@/components/store-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import 'react-quill/dist/quill.snow.css';
import './globals.css';

const inter = Nunito_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Sellstream',
   description: 'sellstream',
   viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1
   }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <StoreProvider>
                  <QueryProvider>
                     <AuthProvider>{children}</AuthProvider>
                  </QueryProvider>
               </StoreProvider>
            </ThemeProvider>
            <Toaster />
         </body>
      </html>
   );
}
