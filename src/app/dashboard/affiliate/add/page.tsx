import DashboardHeader from '@/components/common/dashboard-header';
import { buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserProducts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import AffiliateForm from '@/sections/dashboard/affiliate/form';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getProducts() {
   const respose = await getUserProducts();
   return respose.data.body?.products || [];
}

export default async function NewAffiliateApp() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   return (
      <>
         <DashboardHeader title="New Affiliate" />

         <div className="flex flex-col-reverse justify-around p-8 lg:flex-row lg:space-x-24">
            <div className="mt-8 lg:mt-0">
               <p className="max-w-lg text-sm font-light">
                  Sunt occaecat nisi ullamco cillum velit non laborum cupidatat. Aliquip aliqua
                  eiusmod esse non tempor enim dolore cillum. Elit mollit voluptate cillum ullamco
                  duis enim officia cupidatat nulla Lorem ullamco reprehenderit velit.
               </p>
               <Link href="/dashboard/product/add">
                  <p className="mt-5 font-normal underline">Learn More</p>
               </Link>
            </div>

            <Suspense fallback={<Skeleton className="h-96 w-full max-w-2xl" />}>
               <Form />
            </Suspense>
         </div>
      </>
   );
}

async function Form() {
   const products = await getProducts();

   if (!products.length)
      return (
         <Link href="/dashboard/product/add" className={cn(buttonVariants({ variant: 'brand' }))}>
            <p className="font-normal">Add new product</p>
         </Link>
      );

   return <AffiliateForm products={products} />;
}
