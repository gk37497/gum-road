'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger
} from '@/components/ui/dialog';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAppStore } from '@/lib/store';
import { MerchantProduct, Option } from '@/lib/types';
import toCurrencyString from '@/utils/format-number';
import { fDate } from '@/utils/format-time';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
   product: MerchantProduct;
};

export default function ProductDetail({ product }: Props) {
   const [chosenOption, setChosenOption] = useState<Option>(product.option[0]);
   const addProduct = useAppStore((s) => s.addProduct);

   const { toast } = useToast();

   const router = useRouter();

   function addProductToCart() {
      if (chosenOption) {
         addProduct(product, chosenOption);
         router.push('/store/checkout');
         return;
      }

      toast({
         title: 'Please select a price',
         variant: 'destructive'
      });
   }

   return (
      <div className="mx-auto max-w-6xl space-y-8 p-5">
         <div className="sticky top-0 z-10 flex flex-col space-y-3 rounded-sm border bg-background p-5 md:flex-row md:items-center md:justify-between md:space-y-0">
            <h1>{product.title}</h1>
            <div className="flex w-full max-w-[300px] justify-between">
               <p className="flex-1 text-sm">{toCurrencyString(product.option[0]?.price)}</p>
               <p className="flex-1 text-sm text-brand">{product.option[0]?.duration} month</p>
            </div>
         </div>
         <div className="border">
            <div className="relative h-80 w-full overflow-hidden border-b sm:h-96 md:h-[600px]">
               <Image src={product.coverImage.desktop} alt={product.title} fill />
            </div>

            <div className="flex w-full flex-col md:flex-row">
               <div className="w-full border-b md:border-r">
                  <div className="px-5 py-8">
                     <h1 className="text-2xl">{product.title}</h1>
                  </div>

                  <div className="flex items-center space-x-5 border-t ">
                     <div className="flex items-center space-x-3 border-r  px-5 py-3">
                        <div className="h-8 w-8 rounded-full bg-brand" />
                        <Link href={`/store/${product.merchant}`}>
                           <p>{product.title}</p>
                        </Link>
                     </div>
                  </div>

                  <div
                     dangerouslySetInnerHTML={{ __html: product.description }}
                     className="max-h-96 overflow-y-auto overflow-x-hidden border-t px-5 py-8"
                  />
               </div>

               <div>
                  <div className="space-y-5 p-5">
                     <Select
                        value={chosenOption?._id}
                        onValueChange={(e) => {
                           const option = product.option.find((option) => option._id === e);
                           if (option) {
                              setChosenOption(option);
                           }
                        }}
                     >
                        <SelectTrigger className="w-full md:w-[280px]">
                           <SelectValue placeholder="Price" />
                        </SelectTrigger>
                        <SelectContent>
                           {product.option.map((option, index) => (
                              <SelectItem value={option._id} key={index}>
                                 {option.duration} {option.type}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>

                     <Card className="rounded-sm border ">
                        <CardContent className="space-y-3 p-3">
                           <div className="w-fit rounded-full border px-3 py-2">
                              {chosenOption && (
                                 <p className="text-xs">
                                    {chosenOption.price}₮ {chosenOption.duration}{' '}
                                    {chosenOption.type}
                                 </p>
                              )}
                           </div>

                           <h2 className="text-sm font-bold">{product.title}</h2>
                        </CardContent>
                     </Card>

                     <Button className="h-12 w-full" onClick={addProductToCart}>
                        Add to cart
                     </Button>
                  </div>

                  <Dialog>
                     <DialogTrigger asChild>
                        <h3 className="cursor-pointer px-5 text-center text-xs underline">
                           {product.term.title}
                        </h3>
                     </DialogTrigger>

                     <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                           <DialogTitle>{product.term.title}</DialogTitle>
                        </DialogHeader>
                        <div
                           className="grid gap-4 py-4 text-xs"
                           dangerouslySetInnerHTML={{ __html: product.term.description }}
                        />

                        <p className="text-xs">Last updated {fDate(product.term.updatedAt)}</p>
                     </DialogContent>
                  </Dialog>

                  <div className="m-5 rounded-md border ">
                     <h2 className="p-3 text-xs">{product?.summary}:</h2>

                     <ul>
                        {product.additionalInformation.map((info, index) => (
                           <li
                              key={index}
                              className="flex items-center justify-between border-t  p-3"
                           >
                              <h3 className="text-xs font-bold">{info.attribute}</h3>
                              <p className="text-xs">{info.value}</p>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
