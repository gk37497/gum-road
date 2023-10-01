import { CardItem } from '@/components/common/dashboard/card-item';
import EmptyView from '@/components/common/empty-view';
import DashboardProductCard from '@/components/dashboard-product-card';
import { getUserProducts } from '@/lib/api/server/apis';

async function getProducts() {
   const respose = await getUserProducts();
   return respose.data.body;
}

export default async function ProductList() {
   const res = await getProducts();

   if (!res) return <EmptyView />;

   return (
      <div className="p-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(res.cards).map((item, i) => {
               return <CardItem key={i} item={item[0]} />;
            })}
         </div>
         <div className="py-8">
            <div className="my-8 hidden grid-cols-1 items-center pb-5 text-sm lg:my-0 lg:grid lg:grid-cols-6">
               <div className="px-4 text-left" />
               <div className="text-left">Title</div>
               <div className="px-4 text-left">Members</div>
               <div className="text-left">Sales</div>
               <div className="text-center">Revenue</div>
               <div className="text-center">Price</div>
            </div>

            <div>
               {res.products.map((item) => (
                  <DashboardProductCard key={item.id} product={item} />
               ))}
            </div>
         </div>
      </div>
   );
}
