'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
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
import { fDate } from '@/utils/format-time';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
   product: MerchantProduct;
   affiliateId?: string;
};

export default function ProductDetail({ product, affiliateId }: Props) {
   const [chosenOption, setChosenOption] = useState<Option>(product.option[0]);
   const addProduct = useAppStore((s) => s.addProduct);
   const addAffiliate = useAppStore((s) => s.addAffiliate);

   const { toast } = useToast();

   const router = useRouter();

   function addProductToCart() {
      if (chosenOption) {
         if (affiliateId) addAffiliate(affiliateId, chosenOption);
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
      <div className="space-b-8 bg-white pb-16 text-sm text-background">
         <div className="sticky top-0 z-10 space-y-3 border-b bg-white p-5 py-8">
            <div className="mx-auto flex w-full max-w-5xl flex-row justify-between drop-shadow-md">
               <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                     <AvatarImage src={`https://avatar.vercel.sh/${product.merchant.storeName}`} />
                  </Avatar>
                  <Link href={`/store/${product.merchant._id}`}>
                     <h1 className="text-lg font-semibold capitalize ">
                        {product.merchant.storeName}
                     </h1>
                  </Link>
               </div>
               {/* <div>
                  <p className="text-sm">{toCurrencyString(product.option[0]?.price)}</p>
                  <p className="text-sm text-brand">{product.option[0]?.duration} month</p>
               </div> */}
            </div>
         </div>

         <div className="mx-auto max-w-5xl">
            <div className="relative h-80 w-full overflow-hidden sm:h-96 md:h-[600px]">
               <Image src={product.coverImage.desktop} alt={product.title} fill />
            </div>

            <div className="flex w-full flex-col border md:flex-row">
               <div className="w-full md:border-r">
                  <div className="px-5 py-8">
                     <h1 className="text-3xl">{product.title}</h1>
                  </div>

                  <div className="flex items-center space-x-5 border-t ">
                     <div className="flex items-center space-x-3 border-r  px-5 py-3">
                        <Avatar className="h-8 w-8">
                           <AvatarImage
                              src={`https://avatar.vercel.sh/${product.merchant.storeName}`}
                           />
                        </Avatar>
                        <Link
                           href={
                              affiliateId
                                 ? `/store/${product.merchant._id}?affiliateId=${affiliateId}`
                                 : `/store/${product.merchant._id}`
                           }
                        >
                           <p>{product.merchant.storeName}</p>
                        </Link>
                     </div>
                  </div>

                  <div
                     dangerouslySetInnerHTML={{ __html: product.description }}
                     className="overflow-x-hidden border-t px-5 py-8"
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
                        <SelectTrigger className="w-full bg-white md:w-[280px]">
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

                     <Card className="rounded-sm border bg-white text-background">
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

                     <Button className="h-12 w-full" onClick={addProductToCart} variant="secondary">
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
