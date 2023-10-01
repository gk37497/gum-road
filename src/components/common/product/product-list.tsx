import { MerchantProduct } from '@/lib/types';
import ProductCard from './product-card';

type Props = {
   products?: MerchantProduct[];
   affiliatedProducts?: { uid: string; productId: string }[];
};

export default function ProductList({ products, affiliatedProducts }: Props) {
   return (
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 justify-between gap-5 px-5 pb-16 sm:grid-cols-2 lg:grid-cols-3 ">
         {products?.map((product) => (
            <ProductCard
               key={product._id}
               product={product}
               affiliateId={affiliatedProducts?.find((e) => e.productId === product._id)?.uid}
            />
         ))}
      </div>
   );
}
