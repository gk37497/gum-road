import ProductDetail from '@/components/common/product/product-detail';
import { Skeleton } from '@/components/ui/skeleton';
import { getAffiliateById } from '@/lib/api/server/apis';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

type Props = {
   params: {
      merchantId: string;
      affiliateId: string;
   };
};

async function getAffiliate(id: string) {
   const res = await getAffiliateById(id);
   if (res.data.success) {
      return res.data.body?.affiliate;
   } else {
      return null;
   }
}

export default async function AffiliateDetailPage({ params }: Props) {
   return (
      <Suspense fallback={<Skeleton className="h-full w-full" />}>
         <Detail affiliateId={params.affiliateId} />
      </Suspense>
   );
}

async function Detail({ affiliateId }: { affiliateId: string }) {
   const affiliate = await getAffiliate(affiliateId);

   if (!affiliate) return notFound();

   return <ProductDetail product={affiliate.product} affiliateId={affiliateId} />;
}
