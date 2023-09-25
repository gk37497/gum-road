import ProductList from '@/components/common/product/product-list';
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
   const merchantResponse = await getMerchantProductList(merchantId);

   return (
      <div className="mx-auto max-w-6xl p-12">
         <Suspense>
            <div>{merchantResponse?.merchant.storeName}</div>
            <ProductList products={merchantResponse?.product} />
         </Suspense>
      </div>
   );
}
