import ProductDetail from '@/components/common/product/product-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { getProductById } from '@/lib/api/server/apis';
import { notFound } from 'next/navigation';
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
   return (
      <div>
         <Suspense fallback={<Skeleton className="h-full w-full bg-secondary" />}>
            <Detail productId={params.productId} />
         </Suspense>
      </div>
   );
}

async function Detail({ productId }: { productId: string }) {
   const product = await getProduct(productId);

   if (!product) return notFound();

   return <ProductDetail product={product} />;
}
