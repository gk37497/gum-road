'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAddAffliate } from '@/lib/api/client/use-hooks';
import { addAffliateDefaults } from '@/lib/form/defaults';
import { TAddAffliate } from '@/lib/form/types';
import { addAffliateFormSchema } from '@/lib/form/validations';
import { AddAffiliatePayload, Product } from '@/lib/types';
import { getError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';

type Props = {
   products: Product[];
};

export default function AffiliateForm({ products }: Props) {
   const { toast } = useToast();
   const affiliateMutation = useAddAffliate();
   const router = useRouter();

   const form = useForm<TAddAffliate>({
      resolver: zodResolver(addAffliateFormSchema),
      defaultValues: {
         ...addAffliateDefaults,
         list: products.map((product) => ({
            productId: product.id,
            enabled: false
         }))
      }
   });

   const { fields } = useFieldArray({
      name: 'list',
      control: form.control
   });

   const onSubmit = async (data: TAddAffliate) => {
      const list = data.list
         .filter((item) => item.enabled)
         .map((item) => ({
            productId: item.productId,
            commission: item.commission || 0
         }));

      if (!list.length) {
         toast({
            title: 'Error',
            description: 'Please select at least one product',
            variant: 'destructive'
         });
         return;
      }

      const payload: AddAffiliatePayload = {
         email: data.email,
         list: data.list
            .filter((item) => item.enabled)
            .map((item) => ({
               productId: item.productId,
               commission: item.commission || 0
            }))
      };

      try {
         const res = await affiliateMutation.mutateAsync(payload);
         if (res.success) {
            toast({
               title: 'Success',
               description: 'Affiliate created successfully'
            });

            router.back();
         }
      } catch (error) {
         toast({
            title: 'Error',
            description: getError(error),
            variant: 'destructive'
         });
      }
   };

   if (!products.length) {
      return (
         <div>
            <div className="text-center">No products available</div>
            <Link href="/dashboard/product/add">Add a product</Link>
         </div>
      );
   }

   return (
      <div className="w-full max-w-2xl">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="w-full space-y-8 overflow-hidden"
            >
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <Card>
                           <FormControl>
                              <Input
                                 placeholder="example@company.com"
                                 type="email"
                                 {...field}
                                 className="focus-visible:ring-0"
                              />
                           </FormControl>
                        </Card>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <div>
                  <div className="mb-5 ml-3 hidden items-center justify-between space-x-12 md:flex ">
                     <div className="text-left text-sm font-light">Enable</div>
                     <div className="flex-1 text-left text-sm font-light">Product</div>
                     <div className="max-w-[200px] flex-1 text-left text-sm font-light">
                        Commission
                     </div>
                  </div>

                  <div className="rounded-sm">
                     {fields.map((field, index) => (
                        <Card
                           key={field.id}
                           className="my-5 flex flex-col justify-between space-y-6 rounded-sm border-b md:my-0 md:flex-row md:items-center md:space-x-12 md:space-y-0 md:p-3"
                        >
                           <FormField
                              control={form.control}
                              name={`list.${index}.enabled`}
                              render={({ field }) => (
                                 <FormItem className="border-b p-3 md:border-b-0 md:p-0">
                                    <div className="mb-1 flex text-left text-xs font-bold md:hidden">
                                       Enable
                                    </div>
                                    <FormControl>
                                       <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="flex-1 border-b px-3 pb-2 text-left text-sm font-light md:border-b-0 md:px-0 md:pb-0">
                              <div className="mb-3 flex text-left text-xs font-bold md:hidden">
                                 Product
                              </div>
                              {products[index].title}
                           </div>

                           <FormField
                              control={form.control}
                              name={`list.${index}.commission`}
                              disabled={!form.getValues(`list.${index}.enabled`)}
                              render={({ field }) => (
                                 <FormItem className="px-3 pb-3 md:px-0 md:pb-0">
                                    <div className="mb-1 flex text-left text-xs font-bold md:hidden">
                                       Commission
                                    </div>
                                    <div className="row flex items-center justify-between rounded-sm border px-2">
                                       <FormControl>
                                          <Input
                                             placeholder="10"
                                             type="text"
                                             {...field}
                                             onChange={(e) => {
                                                const value = Number(e.target.value);
                                                field.onChange(value);
                                             }}
                                             className="max-w-[150px] border-none focus-visible:ring-0"
                                          />
                                       </FormControl>
                                       <div>%</div>
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </Card>
                     ))}
                  </div>
               </div>

               <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting || !form.formState.isValid}
               >
                  {form.formState.isSubmitting ? 'Loading...' : 'Create'}
               </Button>
            </form>
         </Form>
      </div>
   );
}
