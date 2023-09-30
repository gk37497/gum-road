import { cn } from '@/lib/utils';
import { Metadata } from 'next';

import DashboardHeader from '@/components/common/dashboard-header';
import { CardItem } from '@/components/common/dashboard/card-item';
import { buttonVariants } from '@/components/ui/button';
import { getUserAffiliateList } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import AffiliateList from '@/sections/dashboard/affiliate/list';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
   title: 'Tasks',
   description: 'A task and issue tracker build using Tanstack Table.'
};

async function getAffiliates() {
   const respose = await getUserAffiliateList();
   return respose.data.body;
}

export default async function Page() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   const res = await getAffiliates();

   if (!res) return null;

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

         <div className="p-8">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
               {Object.values(res.cards).map((item, i) => {
                  return <CardItem key={i} item={item[0]} />;
               })}
            </div>

            <AffiliateList list={res.affiliates} />
         </div>
      </>
   );
}
