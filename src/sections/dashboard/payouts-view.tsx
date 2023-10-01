import { CardItem } from '@/components/common/dashboard/card-item';
import { Overview } from '@/components/common/dashboard/overview';
import { RecentSales } from '@/components/common/dashboard/recent-sales';
import EmptyView from '@/components/common/empty-view';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPayouts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { Payout } from '@/lib/types';
import delve from '@/utils';
import { redirect } from 'next/navigation';

export default async function PayoutsView() {
   const session = await getCurrentUser();
   if (!session) redirect('/auth/login');

   const res = await getPayouts();
   const body = delve<Payout>(res, 'data.body');

   if (!body || !Object.values(body).length) return <EmptyView />;

   return (
      <div className="space-y-4 p-8 md:space-y-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(body.cards).map((item, i) => {
               return <CardItem key={i} item={item[0]} />;
            })}
         </div>

         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-1 h-fit md:col-span-4">
               <CardHeader>
                  <CardTitle>Overview</CardTitle>
               </CardHeader>
               <CardContent>
                  <Overview overview={body.overview} />
               </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-3">
               <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
               </CardHeader>
               <CardContent>
                  <RecentSales transactions={body.tranList[0]?.transactions || []} />
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
