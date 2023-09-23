import { Metadata } from 'next';
import { Suspense } from 'react';
import { UserAuthForm } from './form';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function LoginView() {
  return (
    <div className="container relative h-[100vh] flex-col items-center justify-center md:grid-cols-2 lg:grid lg:max-w-none lg:px-0">
      <div className="xs:p-2 mx-auto flex h-full w-full flex-col justify-center space-y-6 sm:p-16">
        <div className="xs:left-2 absolute top-12 flex flex-col space-y-2 text-left sm:left-16">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back!</h1>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <UserAuthForm />
        </Suspense>
      </div>

      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 bg-[url('/images/login-banner.png')] bg-cover bg-center" />
      </div>
    </div>
  );
}
