import DashboardHeader from '@/components/common/dashboard-header';
import ProductTabs from '@/components/common/dashboard/product-tabs';
import { buttonVariants } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth';
import AffiliatesViewSkeleton from '@/sections/dashboard/affiliates-skeleton';
import AffiliateList from '@/sections/dashboard/products/affiliate-list';
import ProductList from '@/sections/dashboard/products/product-list';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Suspense } from 'react';

const tabs = {
   products: {
      title: 'All products'
   },
   affiliated: {
      title: 'Affiliated products'
   }
};

type Props = {
   params: {
      tab: 'products' | 'affiliated';
   };
};

export default async function Page({ params }: Props) {
   const tab = params.tab;

   if (!tabs[tab as 'products' | 'affiliated']) notFound();

   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   return (
      <div>
         <DashboardHeader
            title={tabs[tab].title}
            button={
               tab === 'products' ? (
                  <Link
                     href="/dashboard/product/add"
                     className={buttonVariants({ variant: 'brand' })}
                  >
                     Add new
                  </Link>
               ) : (
                  <div className="h-9 px-4 py-2" />
               )
            }
         >
            <div className="pt-8">
               <ProductTabs />
            </div>
         </DashboardHeader>

         <div className="pt-24">
            {tab === 'products' ? (
               <Suspense fallback={<AffiliatesViewSkeleton />}>
                  <ProductList />
               </Suspense>
            ) : (
               <Suspense fallback={<AffiliatesViewSkeleton />}>
                  <AffiliateList />
               </Suspense>
            )}
         </div>
      </div>
   );
}
