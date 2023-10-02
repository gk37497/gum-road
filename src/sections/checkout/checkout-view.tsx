/* eslint-disable @next/next/no-img-element */
'use client';
import EmptyView from '@/components/common/empty-view';
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
import { useToast } from '@/components/ui/use-toast';
import {
   useCheckInvoiceIsPaid,
   useCreateInvoiceByAffiliate,
   useCreateInvoiceByProduct
} from '@/lib/api/client/use-hooks';
import { TBuyProduct } from '@/lib/form/types';
import { buyProductFormSchema } from '@/lib/form/validations';
import { useAppStore } from '@/lib/store';
import { BuyProductPayload, BuyProductResponse, MerchantProduct } from '@/lib/types';
import { getError } from '@/utils/api-error';
import toCurrencyString from '@/utils/format-number';
import { fDateTime } from '@/utils/format-time';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutSuccessDialog from './checkout-success-dialog';

export default function CheckoutView() {
   const { toast } = useToast();
   const router = useRouter();
   // const { timeLeft, start } = useCountdown({
   //    initialTime: 0
   // });

   const [showSuccessDialog, setShowSuccessDialog] = useState(false);

   const product = useAppStore((s) => s.product);
   const affiliate = useAppStore((s) => s.affiliate);
   const option = useAppStore((s) => s.option);
   const removeAll = useAppStore((s) => s.removeAll);

   const [qPay, setQPay] = useState<BuyProductResponse>();
   const invoiceId = useRef<string>();
   const [expireDate, setExpireDate] = useState<number>();

   const productCheckoutMutation = useCreateInvoiceByProduct();
   const affiliateCheckoutMutation = useCreateInvoiceByAffiliate();
   const { data, error } = useCheckInvoiceIsPaid({
      invoiceId: invoiceId.current
   });

   const form = useForm<TBuyProduct>({
      resolver: zodResolver(buyProductFormSchema),
      defaultValues: {
         email: ''
      }
   });

   async function buyAffiliate(affiliateId: string, email: string, optionId: string) {
      const affiliatePayload: BuyProductPayload = {
         affiliateId: affiliateId,
         email: email,
         optionId: optionId
      };

      try {
         const res = await affiliateCheckoutMutation.mutateAsync(affiliatePayload);
         if (res.success) {
            setQPay(res.body?.qpay);
            setExpireDate(res.body?.expires_in);
            invoiceId.current = res.body?.transaction.id;
         } else {
            throw new Error(res.message);
         }
      } catch (error) {
         toast({
            title: 'Failed to buy product',
            description: getError(error),
            variant: 'destructive'
         });
      }
   }

   async function buyProduct(product: MerchantProduct, email: string, optionId: string) {
      const productPayload: BuyProductPayload = {
         productId: product._id,
         email: email,
         optionId: optionId
      };

      try {
         const res = await productCheckoutMutation.mutateAsync(productPayload);
         if (res.success) {
            setQPay(res.body?.qpay);
            setExpireDate(res.body?.expires_in);
            invoiceId.current = res.body?.transaction.id;
         } else {
            throw new Error(res.message);
         }
      } catch (error) {
         toast({
            title: 'Failed to buy product',
            description: getError(error),
            variant: 'destructive'
         });
      }
   }

   async function onSubmit(values: TBuyProduct) {
      if (!option?._id || !product) {
         toast({
            title: 'Failed to buy product',
            description: 'Product or option not found',
            variant: 'destructive'
         });
         return;
      }

      if (affiliate) {
         await buyAffiliate(affiliate, values.email, option._id);
      }
      if (!affiliate && product) {
         await buyProduct(product, values.email, option._id);
      }
   }

   useEffect(() => {
      if (invoiceId.current) {
         if (error) {
            invoiceId.current = undefined;
         }

         if (data?.body?.isPaid) {
            setShowSuccessDialog(true);
            invoiceId.current = undefined;
         }
      }
   }, [data, error]);

   if (!option || !product) {
      return (
         <div className="p-8">
            <EmptyView />
         </div>
      );
   }

   return (
      <div className="space-y-8">
         <div className="border-b py-10">
            <div className="mx-auto max-w-5xl px-5">
               <h1 className="text-3xl sm:text-5xl">Checkout</h1>
            </div>
         </div>
         <div className="mx-auto grid max-w-5xl gap-8 p-5  md:grid-cols-2">
            <Card className="h-fit overflow-hidden rounded-sm border ">
               <div className="flex items-start">
                  <div className="relative h-40 w-40">
                     <Image src={product.thumbnail?.desktop || ''} alt={product.title} fill />
                  </div>

                  <div className="flex-1">
                     <div className="flex flex-1 flex-col justify-between p-5 md:flex-row">
                        <div className="space-y-2">
                           <h1 className="text-sm font-bold">{product.title}</h1>
                           <div>
                              <Link href={`/store/${product.merchant._id}`}>
                                 <h1 className="text-sm font-normal text-brand underline">
                                    {product.merchant.storeName}
                                 </h1>
                              </Link>
                           </div>
                        </div>

                        <div className="mt-2 space-y-2 md:mt-0 md:text-right">
                           <h4 className="text-base font-light">
                              {toCurrencyString(option.price)}
                           </h4>
                           <p className="text-sm font-light">
                              {option.duration} {option.type}
                           </p>
                        </div>
                     </div>
                     <div
                        className="flex cursor-pointer justify-end p-5 text-sm underline"
                        onClick={removeAll}
                     >
                        Remove
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between border-t  p-5">
                  <h1 className="text-lg font-bold">Total</h1>
                  <h4 className="text-lg font-bold">{toCurrencyString(option.price)}</h4>
               </div>
            </Card>

            {!qPay ? (
               <Card className="h-fit space-y-5 rounded-sm border ">
                  <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="border-b  p-5">
                           <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                       <Input
                                          placeholder="example@company.com"
                                          type="email"
                                          {...field}
                                          className="h-12 "
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>

                        <div className="px-5 pb-5">
                           <Button
                              className="h-12 w-full"
                              type="submit"
                              disabled={form.formState.isSubmitting}
                           >
                              {form.formState.isSubmitting ? '...' : 'Pay'}
                           </Button>
                        </div>
                     </form>
                  </Form>
               </Card>
            ) : (
               <Card className="h-fit space-y-5 rounded-sm border  p-3">
                  <h1 className="py-1 text-center ">Scan QR code to pay</h1>
                  <div className="min-h-56 mx-auto w-56 space-y-8">
                     <div className="flex flex-row flex-wrap items-center justify-center sm:hidden">
                        {qPay.urls.map((link) => (
                           <div key={link.name} className="m-2 rounded-sm">
                              <a href={link.link} target="_blank" rel="noopener">
                                 <Image
                                    alt={link.name}
                                    src={link.logo}
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: '5px', backgroundColor: 'gray' }}
                                 />
                              </a>
                           </div>
                        ))}
                     </div>

                     <img alt="qrimage" src={`data:image/jpeg;base64,${qPay.qr_image}`} />
                  </div>
                  <p className="text-center">
                     <span className="text-xs font-normal">
                        Expires in:{' '}
                        {expireDate ? fDateTime(new Date(expireDate).toLocaleString()) : ''}
                     </span>
                  </p>
               </Card>
            )}
         </div>
         <CheckoutSuccessDialog
            open={showSuccessDialog}
            onClose={() => {
               setQPay(undefined);
               setShowSuccessDialog(false);
               router.back();
            }}
         />
      </div>
   );
}
