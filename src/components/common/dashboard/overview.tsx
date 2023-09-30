'use client';

import { Overview } from '@/lib/types';
import toCurrencyString from '@/utils/format-number';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type Props = {
   overview?: Overview;
};

export function Overview({ overview }: Props) {
   if (!overview) return null;

   const dayData = overview.revenueByDay.map((item) => ({
      name: item.day,
      total: item.totalAmount
   }));

   return (
      <ResponsiveContainer height={350}>
         <BarChart data={dayData}>
            <XAxis
               dataKey="name"
               stroke="#888888"
               fontSize={12}
               tickLine={false}
               axisLine={false}
            />
            <Tooltip
               cursor={{ style: { display: 'none' } }}
               labelClassName="text-xs font-semibold text-brand"
               wrapperClassName="border-brand shadow-md rounded-md p-2 text-xs"
               formatter={(e) => `${toCurrencyString(e as number)}`}
            />
            <YAxis
               stroke="#888888"
               fontSize={11}
               tickLine={false}
               axisLine={false}
               tickFormatter={(value) => `${toCurrencyString(value)}`}
            />
            <Bar dataKey="total" fill="#242423" radius={[4, 4, 0, 0]} />
         </BarChart>
      </ResponsiveContainer>
   );
}
