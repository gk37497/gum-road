'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';

export function UserNav({ email }: { email?: string }) {
   if (!email) return null;
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
               <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/03.png" alt="@shadcn" />
                  <AvatarFallback>{email.charAt(0)}</AvatarFallback>
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
               <div className="flex flex-col space-y-1">
                  <p className="text-xs leading-none text-muted-foreground">{email}</p>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => signOut()}>Log out</DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
