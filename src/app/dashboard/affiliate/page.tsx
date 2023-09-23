import PageTitle from '@/components/common/page-title';
import { promises as fs } from 'fs';
import { Metadata } from 'next';
import path from 'path';
import { z } from 'zod';

import { DataTable } from '@/components/common/table/data-table';
import { taskSchema } from '@/components/common/table/data/schema';
import { Separator } from '@/components/ui/separator';
import { columns } from '@/sections/dashboard/affiliate/columns';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'A task and issue tracker build using Tanstack Table.'
};

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/components/common/table/data/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function Page() {
  const tasks = await getTasks();

  return (
    <>
      <PageTitle title="Affiliate" />
      <Separator />
      <div className="p-8">
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  );
}
