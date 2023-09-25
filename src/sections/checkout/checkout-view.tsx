/* eslint-disable @next/next/no-img-element */
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
import { useToast } from '@/components/ui/use-toast';
import { useCreateInvoiceByProduct } from '@/lib/api/client/use-hooks';
import { TBuyProduct } from '@/lib/form/types';
import { buyProductFormSchema } from '@/lib/form/validations';
import { useAppStore } from '@/lib/store';
import { BuyProductPayload, BuyProductResponse } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function CheckoutView() {
  const { toast } = useToast();

  const product = useAppStore((s) => s.product);
  const option = useAppStore((s) => s.option);
  const removeAll = useAppStore((s) => s.removeAll);

  const [qPay, setQPay] = useState<BuyProductResponse>();

  const productCheckoutMutation = useCreateInvoiceByProduct();

  const form = useForm<TBuyProduct>({
    resolver: zodResolver(buyProductFormSchema),
    defaultValues: {
      email: ''
    }
  });

  async function onSubmit(values: TBuyProduct) {
    if (!product) return;

    const productPayload: BuyProductPayload = {
      productId: product._id,
      email: values.email
    };

    try {
      const res = await productCheckoutMutation.mutateAsync(productPayload);
      if (res.success) {
        setQPay(res.body?.qpay);
      } else {
        console.log(res);
        throw new Error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Failed to buy product',
        description: error?.toString(),
        variant: 'destructive'
      });
    }
  }

  if (!product || !option) {
    return (
      <div>
        <h1>Empty</h1>
      </div>
    );
  }

  return (
    <div className="row flex space-x-12 p-8">
      <Card className="h-fit w-3/5 overflow-hidden rounded-sm border border-black">
        <div className="row flex items-start">
          <div className="relative h-40 w-40">
            <Image src={product.thumbnail?.desktop || ''} alt={product.title} fill />
          </div>

          <div className="flex-1">
            <div className="row flex flex-1 justify-between p-5">
              <div className="space-y-1">
                <h1 className="text-sm font-bold">{product.title}</h1>
                <h4 className="text-sm font-light underline">{product.title}</h4>
              </div>

              <div className="space-y-2 text-right">
                <h4 className="text-base font-light">{option.price.$numberDecimal}₮</h4>
                <p className="text-sm font-light">
                  {option.duration} {option.type}
                </p>
              </div>
            </div>
            <div
              className="row flex cursor-pointer justify-end p-5 text-sm underline"
              onClick={removeAll}
            >
              Remove
            </div>
          </div>
        </div>

        <div className="row flex items-center justify-between border-t border-black p-5">
          <h1 className="text-lg font-bold">Total</h1>
          <h4 className="text-lg font-bold">{option.price.$numberDecimal}₮</h4>
        </div>
      </Card>

      {!qPay ? (
        <Card className="h-fit w-2/5 space-y-5 rounded-sm border border-black">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="border-b border-black p-5">
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
                          className="h-12 border-black"
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
        <Card className="h-fit w-1/3 space-y-5 rounded-sm border border-black p-3">
          <h1 className="py-1 text-center ">Scan QR code to pay</h1>
          <div className="mx-auto h-56 w-56">
            <img alt="qrimage" src={`data:image/jpeg;base64,${qPay.qr_image}`} />
          </div>
        </Card>
      )}
    </div>
  );
}
