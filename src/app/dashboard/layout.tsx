import { MainNav } from '@/components/common/dashboard/main-nav';
import { UserNav } from '@/components/common/dashboard/user-nav';
import { MobileNav } from '@/components/common/mobile-nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Forms',
   description: 'Advanced form example using react-hook-form and Zod.'
};

interface SettingsLayoutProps {
   children: React.ReactNode;
}

export default function DashboardLayout({ children }: SettingsLayoutProps) {
   return (
      <div className="flex flex-col">
         <div className="border-b">
            <div className="flex h-16 items-center px-8">
               <MainNav className="hidden sm:flex" />
               <MobileNav />
               <div className="ml-auto flex items-center space-x-4">
                  <UserNav />
               </div>
            </div>
         </div>
         <div className="flex-1">{children}</div>
      </div>
   );
}
