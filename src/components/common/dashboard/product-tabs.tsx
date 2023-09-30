'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, useRouter } from 'next/navigation';

export default function ProductTabs() {
   const params = useParams();
   const router = useRouter();

   const onClick = (link: 'products' | 'affiliated') => {
      router.push(`/dashboard/product/${link}`);
   };

   if (!params.tab) return null;

   return (
      <Tabs value={params.tab as string} className="sm:w-[400px]">
         <TabsList className="grid h-12 w-full grid-cols-2">
            <TabsTrigger value="products" className="h-10" onClick={() => onClick('products')}>
               All products
            </TabsTrigger>
            <TabsTrigger value="affiliated" className="h-10" onClick={() => onClick('affiliated')}>
               Affiliated
            </TabsTrigger>
         </TabsList>
      </Tabs>
   );
}
