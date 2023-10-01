import AffiliateCard from '@/components/common/affiliate-card';
import { CardItem } from '@/components/common/dashboard/card-item';
import EmptyView from '@/components/common/empty-view';
import { getUserAffiliates } from '@/lib/api/server/apis';

async function getAffiliates() {
   const respose = await getUserAffiliates();
   return respose.data.body;
}

export default async function AffiliateList() {
   const res = await getAffiliates();

   if (!res) return <EmptyView />;

   return (
      <div className="p-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(res.cards).map((item, i) => {
               return <CardItem key={i} item={item[0]} />;
            })}
         </div>

         <div className="py-6 md:py-12">
            <div className="my-8 hidden grid-cols-1 items-center pb-5 text-sm lg:my-0 lg:grid lg:grid-cols-5">
               <div className="px-4 text-left">Product</div>
               <div className="text-left">Sales</div>
               <div className="px-4 text-center">Commission</div>
               <div className="text-center">Revenue</div>
               <div className="text-center" />
            </div>

            <div>
               {res.affiliates.map((item) => (
                  <AffiliateCard key={item.id} affiliate={item} withEmail={false} />
               ))}
            </div>
         </div>
      </div>
   );
}
