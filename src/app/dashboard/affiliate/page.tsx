import { cn } from '@/lib/utils';
import { Metadata } from 'next';

import DashboardHeader from '@/components/common/dashboard-header';
import { DataTable } from '@/components/common/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { getUserAffiliateList } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { columns } from '@/sections/dashboard/affiliate/columns';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
   title: 'Tasks',
   description: 'A task and issue tracker build using Tanstack Table.'
};

async function getAffiliates() {
   const respose = await getUserAffiliateList();
   return respose.data.body?.affiliates || [];
}

export default async function Page() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   const affiliates = await getAffiliates();

   return (
      <>
         <DashboardHeader title="Affiliates">
            <Link
               href="/dashboard/affiliate/add"
               className={cn(buttonVariants({ variant: 'brand' }))}
            >
               Add new
            </Link>
         </DashboardHeader>

         <Suspense>
            <div className="p-8">
               {affiliates && <DataTable data={affiliates} columns={columns} />}
            </div>
         </Suspense>
      </>
   );
}
