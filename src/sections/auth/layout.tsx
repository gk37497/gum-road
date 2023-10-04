import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({
   type,
   children
}: {
   type: 'signin' | 'signup' | 'reset';
   children: ReactNode;
}) {
   return (
      <div className="container relative h-[100vh] flex-col items-center justify-center md:grid-cols-2 lg:grid lg:max-w-none lg:px-0">
         <div className="xs:p-2 mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:p-16">
            <div className="xs:left-2 absolute top-12 flex flex-col space-y-2 text-left sm:left-16">
               <h1 className="text-2xl font-semibold tracking-tight">
                  {type === 'signin' && 'Welcome back!'}
                  {type === 'reset' && 'Password Reset'}
                  {type === 'signup' && 'Create an account'}
               </h1>
            </div>

            {children}
         </div>

         <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
            <div className="absolute inset-0">
               <Image
                  src="https://djpjib0vv06yz.cloudfront.net/public/login-banner.webp"
                  fill
                  alt="cover"
               />
            </div>
         </div>
      </div>
   );
}
