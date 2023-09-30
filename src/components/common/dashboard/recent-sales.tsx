import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Transaction } from '@/lib/types';
import toCurrencyString from '@/utils/format-number';
import { fDate } from '@/utils/format-time';

export function RecentSales({ transactions }: { transactions: Transaction[] }) {
   return (
      <div className="space-y-8">
         {transactions.map((transaction, i) => (
            <div className="flex items-center" key={i}>
               <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                     {transaction.customerEmail
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                  </AvatarFallback>
               </Avatar>

               <div className="ml-4 space-y-1">
                  <p className="text-xs font-medium leading-none md:text-sm">
                     {transaction.customerEmail}
                  </p>
                  <p className="text-xs text-muted-foreground md:text-sm">
                     {fDate(transaction.updatedAt)}
                  </p>
               </div>
               <div className="ml-auto text-xs font-medium md:text-sm">
                  +{toCurrencyString(transaction.totalAmount)}
               </div>
            </div>
         ))}
      </div>
   );
}
