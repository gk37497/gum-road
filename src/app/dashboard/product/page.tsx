import PageTitle from '@/components/common/page-title';
import { DataTable } from '@/components/common/table/data-table';
import { Separator } from '@/components/ui/separator';
import { getUserProducts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { columns } from '@/sections/dashboard/products/columns';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

async function getProducts() {
  const respose = await getUserProducts();
  return respose.data.body?.product || [];
}

export default async function Page() {
  const session = await getCurrentUser();
  if (!session) {
    redirect('/auth/login');
  }

  const products = await getProducts();

  return (
    <div>
      <PageTitle title="Product" />
      <Separator />
      <Suspense>
        <div className="p-8">{products && <DataTable data={products} columns={columns} />}</div>
      </Suspense>
    </div>
  );
}
