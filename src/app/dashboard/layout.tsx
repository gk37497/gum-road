import { MainNav } from '@/components/common/dashboard/main-nav';
import { UserNav } from '@/components/common/dashboard/user-nav';
import { MobileNav } from '@/components/common/mobile-nav';
import { Skeleton } from '@/components/ui/skeleton';
import { getCustomerInfo } from '@/lib/api/server/apis';
import delve from '@/utils';
import { Suspense } from 'react';

interface SettingsLayoutProps {
   children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
   return (
      <div className="flex flex-col">
         <div className="relative border-b">
            <div className="fixed top-0 z-40 flex h-16 w-full items-center bg-background px-8">
               <MainNav className="hidden sm:flex" />
               <MobileNav />
               <div className="ml-auto flex items-center space-x-4">
                  <Suspense fallback={<Skeleton className="h-8 w-8 rounded-full" />}>
                     <User />
                  </Suspense>
               </div>
            </div>
         </div>
         <div className="min-h-screen flex-1 bg-backgroundSecondary pt-36">{children}</div>
      </div>
   );
}

async function User() {
   const customer = await getCustomerInfo();
   return <UserNav email={delve(customer, 'data.body.email')} />;
}
