import { Card } from '@/components/ui/card';
import { MerchantProduct } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import ProductOption from './product-option';

type Props = {
   product: MerchantProduct;
   affiliateId?: string;
};

export default function ProductCard({ product, affiliateId }: Props) {
   const url = affiliateId
      ? `/store/${product.merchant._id}/affiliate/${affiliateId}`
      : `/store/${product.merchant._id}/product/${product.uid}`;

   return (
      <Link href={url}>
         <Card className="w-full cursor-pointer rounded-sm bg-white text-background">
            <div className="relative h-80 w-full">
               <Image src={product.thumbnail?.desktop || ''} alt={product.title} fill />
            </div>

            <div className="border-t px-4 py-5">
               <h1 className="text-sm font-light">{product.title}</h1>
            </div>

            <div className="flex flex-wrap border-t">
               <ProductOption option={product.option[0]} />
            </div>
         </Card>
      </Link>
   );
}
