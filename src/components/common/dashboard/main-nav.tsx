'use client';

import Link from 'next/link';

import { dashboardLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
   const pathname = usePathname();

   return (
      <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
         {dashboardLinks.map((link) => (
            <Link
               key={link.href}
               href={link.href}
               className={cn(
                  'text-base font-medium transition-colors hover:text-brand',
                  pathname.startsWith(link.parent) ? 'text-brand' : 'text-muted-foreground'
               )}
            >
               {link.title}
            </Link>
         ))}
      </nav>
   );
}
