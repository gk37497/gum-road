import { CardItem } from '@/components/common/dashboard/card-item';
import EmptyView from '@/components/common/empty-view';
import { getUserAffiliateList } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AffiliateList from './affiliate/list';

async function getAffiliates() {
   const respose = await getUserAffiliateList();
   return respose.data.body;
}

export default async function AffiliatesView() {
   const session = await getCurrentUser();
   if (!session) {
      redirect('/auth/login');
   }

   const res = await getAffiliates();

   if (!res) return <EmptyView />;

   return (
      <div className="p-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(res.cards).map((item, i) => {
               return <CardItem key={i} item={item[0]} />;
            })}
         </div>

         <AffiliateList list={res.affiliates} />
      </div>
   );
}
