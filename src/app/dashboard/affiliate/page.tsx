import { cn } from '@/lib/utils';
import { Metadata } from 'next';

import DashboardHeader from '@/components/common/dashboard-header';
import { buttonVariants } from '@/components/ui/button';
import AffiliatesViewSkeleton from '@/sections/dashboard/affiliates-skeleton';
import AffiliatesView from '@/sections/dashboard/affiliates-view';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: 'Affiliates',
   description: 'Affiliates'
};

export default async function Page() {
   return (
      <>
         <DashboardHeader
            title="Affiliates"
            button={
               <Link
                  href="/dashboard/affiliate/add"
                  className={cn(buttonVariants({ variant: 'brand' }))}
               >
                  Add new
               </Link>
            }
         />

         <Suspense fallback={<AffiliatesViewSkeleton />}>
            <AffiliatesView />
         </Suspense>
      </>
   );
}
