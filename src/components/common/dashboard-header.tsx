import { ReactNode } from 'react';

export default function DashboardHeader({
   title,
   children,
   button
}: {
   title: ReactNode;
   children?: ReactNode;
   button?: ReactNode;
}) {
   return (
      <div className="fixed top-12 z-10 w-full flex-1 border-b bg-background px-8 py-6">
         <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <div className="flex items-center space-x-2">{button}</div>
         </div>
         {children}
      </div>
   );
}
