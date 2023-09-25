import { Card } from '@/components/ui/card';
import { MerchantProduct } from '@/lib/types';
import { StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import ProductOption from './product-option';

type Props = {
   product: MerchantProduct;
};

export default function ProductCard({ product }: Props) {
   return (
      <Link href={`/store/${product.merchant}/product/${product.uid}`}>
         <Card className="w-full cursor-pointer rounded-sm border">
            <div className="relative h-80 w-full">
               <Image src={product.thumbnail?.desktop || ''} alt={product.title} fill />
            </div>

            <div className="px-4 py-5">
               <h1 className="text-sm font-light">{product.title}</h1>
            </div>

            <div className="row flex items-center justify-between border-y">
               <div className="row flex w-full items-center space-x-3 border-r p-5">
                  <StarIcon />
                  <p className="text-sm font-light">No ratings</p>
               </div>
               <div className="w-full p-2">
                  <ProductOption option={product.option[0]} />
               </div>
            </div>
         </Card>
      </Link>
   );
}
