import { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import toCurrencyString from '@/utils/format-number';
import Image from 'next/image';
import Link from 'next/link';

const className = 'p-4 w-full lg:text-center border-b lg:border-none flex flex-col lg:flex-row';

export default function DashboardProductCard({ product }: { product: Product }) {
   return (
      <div className="my-8 grid grid-cols-1 items-center rounded-sm border bg-background text-sm font-light lg:my-0 lg:grid-cols-6 lg:rounded-none">
         <div className={cn(className, 'relative h-24 w-24 p-1')}>
            <Image src={product.thumbnail.tablet} alt={product.title} fill />
         </div>
         <div className={cn(className, 'items-left flex')}>
            <Link href={`/store/6513cd43bb134393a3547834/product/${product.uid}`}>
               <div className="font-light underline">{product.title}</div>
            </Link>
         </div>
         <div className={className}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Members</h2>
            {product.members}
         </div>
         <div className={className}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Sales</h2>
            {product.sales}
         </div>
         <div className={cn(className, 'lg:justify-center')}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Revenue</h2>
            {toCurrencyString(product.reveune)}
         </div>
         <div className={cn(className, 'lg:justify-center')}>
            <h2 className="mb-1 text-xs font-bold lg:hidden">Price</h2>
            {toCurrencyString(product.option[0]?.price)} / {product.option[0]?.duration}{' '}
            {product.option[0]?.type}
         </div>
      </div>
   );
}
