import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardItem as TCardItem } from '@/lib/types';
import toCurrencyString from '@/utils/format-number';
import { StarIcon } from '@radix-ui/react-icons';

export function CardItem({ item }: { item: TCardItem }) {
   if (!item) return null;

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <StarIcon className="text-brand" />
         </CardHeader>
         <CardContent>
            <div className="text-2xl font-bold">
               {item.title === 'Revenue' ? toCurrencyString(item.value) : item.value}
            </div>
         </CardContent>
      </Card>
   );
}
