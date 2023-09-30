import DashboardHeader from '@/components/common/dashboard-header';
import { buttonVariants } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   return (
      <div>
         <DashboardHeader
            title="Product"
            button={
               <Link href="/dashboard/product/add" className={buttonVariants({ variant: 'brand' })}>
                  Add new
               </Link>
            }
         />
      </div>
   );
}
