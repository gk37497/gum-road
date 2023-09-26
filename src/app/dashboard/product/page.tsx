import DashboardHeader from '@/components/common/dashboard-header';
import { DataTable } from '@/components/common/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { getUserProducts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { columns } from '@/sections/dashboard/products/columns';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getProducts() {
   const respose = await getUserProducts();
   return respose.data.body?.product || [];
}

export default async function Page() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   const products = await getProducts();

   return (
      <div>
         <DashboardHeader title="Product">
            <Link href="/dashboard/product/add" className={buttonVariants({ variant: 'brand' })}>
               Add new
            </Link>
         </DashboardHeader>

         <Suspense>
            <div className="p-8">{products && <DataTable data={products} columns={columns} />}</div>
         </Suspense>
      </div>
   );
}
