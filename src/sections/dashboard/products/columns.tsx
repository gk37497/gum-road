'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/common/table/data-table-column-header';
import { labels, priorities, statuses } from '@/components/common/table/data/data';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Product } from '@/lib/types';

export const columns: ColumnDef<Product>[] = [
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
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Name" />,
      cell: ({ row }) => <div className="w-[80px] text-xs">{row.original.title}</div>,
      enableSorting: false,
      enableHiding: false
   },
   {
      accessorKey: 'title',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
      cell: ({ row }) => {
         const label = labels.find((label) => label.value === row.original.title);

         return (
            <div className="flex space-x-2">
               {label && <Badge variant="outline">{label.label}</Badge>}
               <span className="max-w-[500px] truncate text-xs font-medium">
                  {row.original.price}₮
               </span>
            </div>
         );
      }
   },
   {
      accessorKey: 'status',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
         const status = statuses.find((status) => status.value === row.getValue('status'));

         // if (!status) {
         //   return null;
         // }

         return (
            <div className="flex w-[100px] items-center">
               {status?.icon && <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
               <span className="text-xs">{row.original.createdAt}</span>
            </div>
         );
      },
      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      }
   },
   {
      accessorKey: 'priority',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Product Id" />,
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
               <span className="text-xs">{row.original._id}</span>
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
