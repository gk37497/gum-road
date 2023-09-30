import AffiliateCard from '@/components/common/affiliate-card';
import { Affliate } from '@/lib/types';

export default function AffiliateList({ list }: { list?: Affliate[] }) {
   if (!list) return null;
   return (
      <div className="py-6 md:py-12">
         <div className="my-8 hidden grid-cols-1 items-center pb-5 text-sm lg:my-0 lg:grid lg:grid-cols-6">
            <div className="px-4 text-left">Product</div>
            <div className="text-left">Sales</div>
            <div className="px-4 text-left">Email</div>
            <div className="px-4 text-center">Commission</div>
            <div className="text-center">Revenue</div>
            <div className="text-center" />
         </div>

         <div>
            {list.map((item) => (
               <AffiliateCard key={item.id} affiliate={item} withEmail />
            ))}
         </div>
      </div>
   );
}
