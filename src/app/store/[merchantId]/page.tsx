import { getMerchantIdList } from '@/lib/api/server/apis';

type Props = {
  params: {
    merchantId: string;
  };
};

async function getIds() {
  const res = await getMerchantIdList();
  return res.data.body?.list || [];
}

export async function generateStaticParams() {
  const merchants = await getIds();

  return merchants.map((merchantId) => ({
    merchantId
  }));
}

export default function MerchantDetailPage({ params }: Props) {
  const { merchantId } = params;

  return (
    <div>
      <div>Merchant Page {merchantId}</div>
    </div>
  );
}
