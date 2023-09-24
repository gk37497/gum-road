'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';

export default function CheckoutView() {
  const product = useAppStore((s) => s.product);
  const option = useAppStore((s) => s.option);

  const removeAll = useAppStore((s) => s.removeAll);

  if (!product || !option) {
    return (
      <div>
        <h1>Empty</h1>
      </div>
    );
  }

  return (
    <div className="row flex space-x-12 p-8">
      <Card className="w-3/5 overflow-hidden rounded-sm border border-black">
        <div className="row flex items-start">
          <div className="relative h-40 w-40">
            <Image src={product.thumbnail.desktop} alt={product.title} fill />
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

      <Card className="h-fit w-2/5 space-y-5 rounded-sm border border-black">
        <div className="border-b border-black p-5">
          <Label>
            <span className="text-sm font-bold">Email</span>
          </Label>
          <Input placeholder="example@compony.com" className="h-12 border-black" />
        </div>

        <div className="px-5 pb-5">
          <Button className="h-12 w-full">Pay</Button>
        </div>
      </Card>
    </div>
  );
}
