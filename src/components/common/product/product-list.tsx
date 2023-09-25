import { MerchantProduct } from '@/lib/types';
import ProductCard from './product-card';

type Props = {
   products?: MerchantProduct[];
};

export default function ProductList({ products }: Props) {
   return (
      <div className="grid w-full grid-cols-3 gap-5">
         {products?.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
   );
}
