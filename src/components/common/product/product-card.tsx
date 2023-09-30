import { Card } from '@/components/ui/card';
import { MerchantProduct } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import ProductOption from './product-option';

type Props = {
   product: MerchantProduct;
};

export default function ProductCard({ product }: Props) {
   return (
      <Link href={`/store/${product.merchant}/product/${product.uid}`}>
         <Card className="w-full cursor-pointer rounded-sm p-0.5">
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
