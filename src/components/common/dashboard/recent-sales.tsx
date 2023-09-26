import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// deno 6 user
const users = [
   {
      name: 'Olivia Martin',
      email: 'olivia.martin@email.com',
      amount: 1999
   },
   {
      name: 'Jackson Lee',
      email: 'jackson.lee@email.com',
      amount: 39
   },
   {
      name: 'Isabella Nguyen',
      email: 'jackson.lee@email.com',
      amount: 299
   },
   {
      name: 'William Kim',
      email: 'jackson.lee@email.com',
      amount: 99
   },
   {
      name: 'Sofia Davis',
      email: 'jackson.lee@email.com',
      amount: 39
   }
];

export function RecentSales() {
   return (
      <div className="space-y-8">
         {users.map((user) => (
            <div className="flex items-center" key={user.name}>
               <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>
                     {user.name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                  </AvatarFallback>
               </Avatar>
               <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
               </div>
               <div className="ml-auto font-medium">+${user.amount}</div>
            </div>
         ))}
      </div>
   );
}
