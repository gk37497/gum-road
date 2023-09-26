import { ReactNode } from 'react';

export default function DashboardHeader({
   title,
   children
}: {
   title: ReactNode;
   children?: ReactNode;
}) {
   return (
      <div className="sticky top-0 z-10 flex-1 border-b bg-background px-8 py-6">
         <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <div className="flex items-center space-x-2">{children}</div>
         </div>
      </div>
   );
}
