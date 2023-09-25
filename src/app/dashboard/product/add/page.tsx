import PageTitle from '@/components/common/page-title';
import { Separator } from '@/components/ui/separator';
import { ProductForm } from '@/sections/dashboard';

export default function AddProductPage() {
   return (
      <div>
         <div className="sticky top-0 z-10 bg-background">
            <div className="row flex items-center justify-between">
               <PageTitle title="New Product" />
            </div>
            <Separator />
         </div>
         <div className="p-12">
            <ProductForm />
         </div>
      </div>
   );
}
