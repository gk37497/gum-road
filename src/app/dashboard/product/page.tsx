import PageTitle from '@/components/common/page-title';
import { DataTable } from '@/components/common/table/data-table';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getUserProducts } from '@/lib/api/server/apis';
import { getCurrentUser } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { columns } from '@/sections/dashboard/products/columns';
import Link from 'next/link';
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
      <div className="row flex w-full items-center justify-between">
        <PageTitle title="Product" />
        <Link
          href="/dashboard/product/add"
          className={cn(buttonVariants({ variant: 'default' }), 'mr-8')}
        >
          Add new product
        </Link>
      </div>
      <Separator />
      <Suspense>
        <div className="p-8">{products && <DataTable data={products} columns={columns} />}</div>
      </Suspense>
    </div>
  );
}
