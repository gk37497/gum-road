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
import { useAppStore } from '@/lib/store';
import { MerchantProduct, Option } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ProductOption from './product-option';

type Props = {
  product: MerchantProduct;
};

export default function ProductDetail({ product }: Props) {
  const [chosenOption, setChosenOption] = useState<Option>(product.option[0]);
  const addProduct = useAppStore((s) => s.addProduct);

  const router = useRouter();

  function addProductToCart() {
    if (chosenOption) addProduct(product, chosenOption);

    // ! fix
    setTimeout(() => {
      router.push('/store/checkout');
    }, 500);
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-5">
      <div className="row flex items-center space-x-8 border-y border-black py-5">
        <ProductOption option={product.option[0]} />
        <h1>{product.title}</h1>
      </div>
      <div className="border border-black">
        <div className="border-md relative h-[600px] w-full overflow-hidden">
          <Image src={product.coverImage.desktop} alt={product.title} fill />
        </div>

        <div className="row flex w-full">
          <div className="w-full border-r border-black">
            <div className="px-5 py-8">
              <h1 className="text-2xl">{product.title}</h1>
            </div>

            <div className="row flex items-center space-x-5 border-t border-black">
              <div className="row flex items-center space-x-3 border-r border-black px-5 py-3">
                <div className="h-8 w-8 rounded-full bg-orange-400" />
                <p>{product.title}</p>
              </div>

              <p>0 ratings</p>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className="border-t border-black px-5 py-8"
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
                <SelectTrigger className="w-[280px] border-black">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  {product.option.map((option, index) => (
                    <SelectItem value={option._id} key={index}>
                      {option.duration} {option.type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Card className="rounded-sm border border-black">
                <CardContent className="space-y-3 p-3">
                  <div className="w-fit rounded-full border border-black px-3 py-2">
                    <p className="text-xs">
                      {chosenOption.price.$numberDecimal}₮ {chosenOption.duration}{' '}
                      {chosenOption.type}
                    </p>
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

                <p className="text-xs">Last updated {product.term.updatedAt}</p>
              </DialogContent>
            </Dialog>

            <div className="m-5 rounded-md border border-black">
              <h2 className="p-3 text-xs">{product.summary}:</h2>

              <ul>
                {product.additionalInformation.map((info, index) => (
                  <li
                    key={index}
                    className="row flex items-center justify-between border-t border-black p-3"
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
