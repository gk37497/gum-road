import DashboardHeader from '@/components/common/dashboard-header';
import { getUserProducts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import AffiliateForm from '@/sections/dashboard/affiliate/form';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getProducts() {
   const respose = await getUserProducts();
   return respose.data.body?.product || [];
}

export default async function NewAffiliateApp() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   const products = await getProducts();

   return (
      <>
         <DashboardHeader title="New Affiliate" />

         <div className="flex flex-col-reverse p-8 md:flex-row md:space-x-24">
            <div className="mt-8 md:mt-0">
               <p className="max-w-sm text-sm font-light">
                  Sunt occaecat nisi ullamco cillum velit non laborum cupidatat. Aliquip aliqua
                  eiusmod esse non tempor enim dolore cillum. Elit mollit voluptate cillum ullamco
                  duis enim officia cupidatat nulla Lorem ullamco reprehenderit velit.
               </p>
               <Link href="/dashboard/product/add">
                  <p className="mt-5 font-normal underline">Learn More</p>
               </Link>
            </div>

            <AffiliateForm products={products} />
         </div>
      </>
   );
}
