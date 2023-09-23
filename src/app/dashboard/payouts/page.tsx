import PageTitle from '@/components/common/page-title';
import { Separator } from '@/components/ui/separator';
import PayoutCard from '@/sections/dashboard/payouts/card';

export default function Page() {
  return (
    <div>
      <PageTitle title="Payouts" />
      <Separator />

      <div className="row flex space-x-8 p-8">
        <PayoutCard />
        <PayoutCard />
      </div>
    </div>
  );
}
