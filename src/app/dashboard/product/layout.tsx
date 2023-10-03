import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
   title: 'Products',
   description: 'Products'
};

export default function Index({ children }: PropsWithChildren) {
   return <div>{children}</div>;
}
