import { Skeleton } from '@/components/ui/skeleton';

export default function AffiliatesViewSkeleton() {
   return (
      <div className="space-y-4 p-8 md:space-y-8">
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-28 w-full" />
         </div>

         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Skeleton className="col-span-1 h-96 md:col-span-7" />
         </div>
      </div>
   );
}
