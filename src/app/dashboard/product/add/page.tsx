import DashboardHeader from '@/components/common/dashboard-header';
import { ProductForm } from '@/sections/dashboard';

export default function AddProductPage() {
   return (
      <>
         <DashboardHeader title="New Product" />
         <div className="p-8">
            <ProductForm />
         </div>
      </>
   );
}
