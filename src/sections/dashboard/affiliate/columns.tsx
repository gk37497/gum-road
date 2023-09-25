'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header';
import { labels, priorities, statuses } from '@/components/common/table/data/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Affliate } from '@/lib/types';
import Link from 'next/link';

export const columns: ColumnDef<Affliate>[] = [
   {
      id: 'select',
      header: ({ table }) => (
         <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
         />
      ),
      cell: ({ row }) => (
         <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-[2px]"
         />
      ),
      enableSorting: false,
      enableHiding: false
   },
   {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Merchant Id" />,
      cell: ({ row }) => <div className="w-[80px]">{row.original.merchant}</div>,
      enableSorting: false,
      enableHiding: false
   },
   {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Commission" />,
      cell: ({ row }) => {
         const label = labels.find((label) => label.value === row.original.merchant);

         return (
            <div className="flex space-x-2">
               {label && <Badge variant="outline">{label.label}</Badge>}
               <span className="text-center font-medium">
                  {row.original.commission.toString()}%
               </span>
            </div>
         );
      }
   },
   {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
         const status = statuses.find((status) => status.value === row.getValue('status'));

         // if (!status) {
         //   return null;
         // }

         return (
            <div className="flex w-[100px] items-center">
               {status?.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}

               <span>{row.original.status}</span>
            </div>
         );
      },
      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      }
   },
   {
      accessorKey: 'priority',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Link" />,
      cell: ({ row }) => {
         const priority = priorities.find(
            (priority) => priority.value === row.getValue('priority')
         );

         // if (!priority) {
         //   return null;
         // }

         return (
            <div className="flex items-center">
               {priority?.icon && <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
               <Link href={row.original.link} className="underline">
                  <span className="text-xs">Affliate link</span>
               </Link>
            </div>
         );
      },
      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      }
   }
   //   {
   //     id: 'actions',
   //     cell: ({ row }) => <DataTableRowActions row={row} />
   //   }
];
