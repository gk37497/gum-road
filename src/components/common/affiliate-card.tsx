'use client';
import { Affliate } from '@/lib/types';
import { cn } from '@/lib/utils';
import toCurrencyString from '@/utils/format-number';
import { FileIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const className = 'p-4 w-full lg:text-center border-b lg:border-none flex flex-col lg:flex-row';

type Props =
   | {
        withEmail: false;
        affiliate: Omit<Affliate, 'email'>;
     }
   | {
        withEmail: true;
        affiliate: Affliate;
     };

export default function AffiliateCard({ withEmail, affiliate }: Props) {
   const { toast } = useToast();

   const handleCopy = async () => {
      await navigator.clipboard.writeText(affiliate.link).then(() => {
         toast({
            title: 'Copied',
            description: 'Affiliate link copied to clipboard'
         });
      });
   };

   return (
      <div
         className={cn(
            'my-8 grid grid-cols-1 items-center rounded-sm border bg-background text-sm font-light lg:my-0 lg:rounded-none',
            withEmail ? 'lg:grid-cols-6' : 'lg:grid-cols-5'
         )}
      >
         <div className={cn(className, 'items-left flex')}>
            <Link href={`/store/6513cd43bb134393a3547834/product/${affiliate.productId}`}>
               <div className="font-light underline">{affiliate.productTitle}</div>
            </Link>
         </div>
         <div className={className}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Sales</h2>
            {affiliate.sales}
         </div>
         {withEmail && (
            <div className={className}>
               <h2 className="mb-1 text-xs font-bold lg:hidden">Email</h2>
               {affiliate.email}
            </div>
         )}
         <div className={cn(className, 'lg:justify-center')}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Commission</h2>
            {affiliate.commission}%
         </div>
         <div className={cn(className, 'lg:justify-center')}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Reveune</h2>
            {toCurrencyString(affiliate.reveune)}
         </div>
         <div className={cn(className, 'items-start lg:justify-center')}>
            <Button variant={'outline'} className="h-14" onClick={handleCopy}>
               <FileIcon className="mr-2" />
               <span>Copy link</span>
            </Button>
         </div>
      </div>
   );
}
