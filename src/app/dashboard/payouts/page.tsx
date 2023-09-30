import DashboardHeader from '@/components/common/dashboard-header';
import { buttonVariants } from '@/components/ui/button';
import PayoutsView from '@/sections/dashboard/payouts-view';
import PayoutsViewSkeleton from '@/sections/dashboard/payouts-view-skeleton';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: 'Payouts',
   description: 'Payouts'
};

export default function Page() {
   return (
      <>
         <DashboardHeader
            title="Payouts"
            button={
               <Link
                  href="/dashboard/affiliate/add"
                  className={buttonVariants({ variant: 'brand' })}
               >
                  Widthdraw
               </Link>
            }
         />

         <Suspense fallback={<PayoutsViewSkeleton />}>
            <PayoutsView />
         </Suspense>
      </>
   );
}
