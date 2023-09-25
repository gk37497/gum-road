import ProductDetail from '@/components/common/product/product-detail';
import { getProductById } from '@/lib/api/server/apis';
import { Suspense } from 'react';

type Props = {
   params: {
      merchantId: string;
      productId: string;
   };
};

async function getProduct(id: string) {
   const res = await getProductById(id);
   if (res.data.success) {
      return res.data.body?.product;
   } else {
      return null;
   }
}

export default async function ProductDetailPage({ params }: Props) {
   const { productId } = params;
   const product = await getProduct(productId);
   return (
      <div>
         <Suspense>{product && <ProductDetail product={product} />}</Suspense>
      </div>
   );
}
