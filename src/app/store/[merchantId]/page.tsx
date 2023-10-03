import ProductList from '@/components/common/product/product-list';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
   getAffiliateByMerchant,
   getMerchantIdList,
   getMerchantProducts
} from '@/lib/api/server/apis';
import { Suspense } from 'react';

type Props = {
   params: {
      merchantId: string;
   };
   searchParams: {
      affiliateId?: string;
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

export default async function MerchantDetailPage({ params, searchParams }: Props) {
   const { merchantId } = params;
   return (
      <section className="min-h-screen bg-white text-background">
         <div className="space-y-8">
            <Suspense fallback={<LoadingView />}>
               <List merchantId={merchantId} affiliateId={searchParams?.affiliateId} />
            </Suspense>
         </div>
      </section>
   );
}

async function List({ merchantId, affiliateId }: { merchantId: string; affiliateId?: string }) {
   const merchantResponse = await getMerchantProductList(merchantId);

   const affiliatedProducts = await getAffiliateByMerchant(affiliateId);

   if (!merchantResponse) return null;

   return (
      <>
         <div className="sticky top-0 z-10 space-y-3 border-b bg-white px-5 py-8">
            <div className="mx-auto flex w-full max-w-6xl flex-row justify-between ">
               <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                     <AvatarImage
                        src={`https://avatar.vercel.sh/${
                           merchantResponse?.merchant?.storeName || 'gumroad'
                        }`}
                     />
                  </Avatar>
                  <h1 className="text-lg font-semibold">
                     {merchantResponse?.merchant?.storeName || ''}
                  </h1>
               </div>
            </div>
         </div>

         <ProductList
            products={merchantResponse?.product}
            affiliatedProducts={affiliatedProducts?.data.body?.list}
         />
      </>
   );
}

function LoadingView() {
   return (
      <>
         <div className="sticky top-0 z-10 space-y-3 border-b  px-5 py-8">
            <div className="mx-auto flex w-full max-w-6xl flex-row justify-between ">
               <Skeleton className="h-16 w-full bg-secondary" />
            </div>
         </div>
         <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-between gap-5 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-3 ">
            {Array.from({ length: 6 }).map((_, i) => (
               <Skeleton key={i} className="h-96 w-full bg-secondary/50" />
            ))}
         </div>
      </>
   );
}
