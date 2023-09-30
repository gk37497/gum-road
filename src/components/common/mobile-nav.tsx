'use client';

import { TextAlignJustifyIcon } from '@radix-ui/react-icons';
import Link, { LinkProps } from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

import { dashboardLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

export function MobileNav() {
   const pathName = usePathname();
   const [open, setOpen] = React.useState(false);

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               variant="ghost"
               className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 sm:hidden"
            >
               <TextAlignJustifyIcon className="h-5 w-5" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="pr-0">
            <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
               <div className="mr-2 h-4 w-4" />
               <span className="font-bold">Gumroad</span>
            </MobileLink>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
               <div className="flex flex-col space-y-3 pl-8">
                  {dashboardLinks.map(
                     (item) =>
                        item.href && (
                           <MobileLink
                              key={item.href}
                              href={item.href}
                              onOpenChange={setOpen}
                              className="py-2"
                              active={pathName.startsWith(item.href)}
                           >
                              {item.title}
                           </MobileLink>
                        )
                  )}
               </div>
            </ScrollArea>
         </SheetContent>
      </Sheet>
   );
}

interface MobileLinkProps extends LinkProps {
   // eslint-disable-next-line no-unused-vars
   onOpenChange?: (open: boolean) => void;
   children: React.ReactNode;
   className?: string;
   active?: boolean;
}

function MobileLink({
   href,
   onOpenChange,
   className,
   active,
   children,
   ...props
}: MobileLinkProps) {
   const router = useRouter();
   return (
      <Link
         href={href}
         onClick={() => {
            router.push(href.toString());
            onOpenChange?.(false);
         }}
         className={cn(className, active ? 'text-brand' : 'text-primary')}
         {...props}
      >
         {children}
      </Link>
   );
}
