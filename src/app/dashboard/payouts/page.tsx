import DashboardHeader from '@/components/common/dashboard-header';
import { buttonVariants } from '@/components/ui/button';
import PayoutsView from '@/sections/dashboard/payouts-view';
import Link from 'next/link';

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

         <PayoutsView />
      </>
   );
}
