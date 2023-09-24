import { SidebarNav } from '@/components/common/sidebar-nav';
import { Separator } from '@/components/ui/separator';
import { sidebarNavItems } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.'
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="min-h-[100vh] border-r lg:w-1/5">
        <div className="sticky top-0">
          <div className="space-y-0.5 p-14">
            <h1 className="text-4xl font-normal tracking-tight">Gumroad</h1>
          </div>

          <Separator />
        </div>

        <SidebarNav items={sidebarNavItems} />
      </aside>

      <div className="flex-1">{children}</div>
    </div>
  );
}
