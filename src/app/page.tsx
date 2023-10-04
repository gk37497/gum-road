import { Button } from '@/components/ui/button';
import { getMerchantIdList } from '@/lib/api/server/apis';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

async function getIds() {
   const res = await getMerchantIdList();
   return res.data.body?.list || [];
}

export default function Home() {
   return (
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
         <div className="z-10 flex h-full w-full flex-1 flex-col items-center justify-between space-y-8">
            <h1 className="text-4xl text-white opacity-70 md:text-6xl" />
            <Suspense fallback={null}>
               <Buttons />
            </Suspense>
         </div>
         <div className="absolute inset-0 opacity-50">
            <Image src="https://djpjib0vv06yz.cloudfront.net/public/walll.webp" fill alt="cover" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-background from-20% via-40%" />
      </main>
   );
}

async function Buttons() {
   const res = await getIds();

   if (!res || res.length === 0) return null;

   return (
      <>
         <Link href={`/store/${res[0]}`}>
            <Button
               variant="ghost"
               className="rounded-md border border-white px-16 py-8 text-lg font-light"
            >
               Discover
            </Button>
         </Link>
         <Link href="/dashboard">
            <Button variant="ghost" className="rounded-md border-0 border-muted text-xs">
               Go To Dashboard
            </Button>
         </Link>
      </>
   );
}
