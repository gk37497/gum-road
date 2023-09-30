import ProductList from '@/components/common/product/product-list';
import { Skeleton } from '@/components/ui/skeleton';
import { getMerchantIdList, getMerchantProducts } from '@/lib/api/server/apis';
import { Suspense } from 'react';

type Props = {
   params: {
      merchantId: string;
   };
};

async function getIds() {
   const res = await getMerchantIdList();
   return res.data.body?.list || [];
}

export async function generateStaticParams() {
   const merchants = await getIds();

   return merchants.map((merchantId) => ({
      merchantId
   }));
}

async function getMerchantProductList(id: string) {
   const res = await getMerchantProducts(id);
   return res.data.body;
}

export default async function MerchantDetailPage({ params }: Props) {
   const { merchantId } = params;

   return (
      <div className="mx-auto max-w-6xl space-y-8 p-5">
         <Suspense fallback={<LoadingView />}>
            <List merchantId={merchantId} />
         </Suspense>
      </div>
   );
}

async function List({ merchantId }: { merchantId: string }) {
   const merchantResponse = await getMerchantProductList(merchantId);

   if (!merchantResponse) return null;

   return (
      <>
         <div className="flex text-lg font-bold capitalize">
            {merchantResponse?.merchant.storeName}
         </div>
         <ProductList products={merchantResponse?.product} />
      </>
   );
}

function LoadingView() {
   return (
      <>
         <Skeleton className="h-16 w-full" />
         <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
               <Skeleton key={i} className="h-96 w-full" />
            ))}
         </div>
      </>
   );
}
