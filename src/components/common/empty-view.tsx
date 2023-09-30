/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export default function EmptyView({ link }: { link?: string }) {
   return (
      <div className="flex flex-col items-center justify-center">
         <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-primary">No data found</div>
            <div className="text-primary">Try creating a new one</div>
         </div>
         {link && (
            <div className="mt-8">
               <Link href={link} className={cn(buttonVariants({ variant: 'brand' }))}>
                  Create
               </Link>
            </div>
         )}
      </div>
   );
}
