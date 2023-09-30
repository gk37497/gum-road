import { MainNav } from '@/components/common/dashboard/main-nav';
import { MobileNav } from '@/components/common/mobile-nav';

interface SettingsLayoutProps {
   children: React.ReactNode;
}

export default async function DashboardLayout({ children }: SettingsLayoutProps) {
   // const customer = await getCustomerInfo();

   return (
      <div className="flex flex-col">
         <div className="relative border-b">
            <div className="fixed top-0 z-40 flex h-16 w-full items-center bg-background px-8">
               <MainNav className="hidden sm:flex" />
               <MobileNav />
               <div className="ml-auto flex items-center space-x-4">
                  {/* <UserNav email={delve(customer, 'data.body.email')} /> */}
               </div>
            </div>
         </div>
         <div className="flex-1 bg-backgroundSecondary pt-36">{children}</div>
      </div>
   );
}
