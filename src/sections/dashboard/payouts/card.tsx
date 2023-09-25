import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PayoutCard() {
   return (
      <Card className="cursor-pointer">
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
         </CardHeader>
         <CardContent className="w-full md:min-w-[200px]">
            <div className="text-2xl font-bold">$12,234</div>
         </CardContent>
      </Card>
   );
}
