import PasswordResetView from '@/sections/auth/reset-password/view';
import { redirect } from 'next/navigation';

type Props = {
   searchParams: {
      token: string;
   };
};

export default function Page({ searchParams }: Props) {
   if (!searchParams.token) redirect('/auth/login');
   return <PasswordResetView token={searchParams.token} />;
}
