'use client';

import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

export default function AuthProvider({ children, ...props }: React.PropsWithChildren) {
   return <SessionProvider {...props}>{children}</SessionProvider>;
}
