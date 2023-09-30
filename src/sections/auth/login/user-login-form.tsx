'use client';
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export const formSchema = z.object({
   mail: z.string().email(),
   password: z.string()
});

export interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
   const { toast } = useToast();
   const params = useSearchParams();

   const form = useForm<z.infer<typeof formSchema>>({
      // @ts-ignore
      resolver: zodResolver(formSchema),
      defaultValues: {
         mail: '',
         password: ''
      }
   });

   const { isSubmitting } = form.formState;

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const payload = {
         email: values.mail,
         password: values.password
      };
      await signIn('Credentials', {
         ...payload,
         redirect: false
      })
         .then((response) => {
            const callbackUrl = params.has('callbackUrl') ? `${params.get('callbackUrl')}` : null;
            if (!response?.error && response?.ok) {
               if (callbackUrl) window.location.href = callbackUrl;
               else window.location.href = '/dashboard';
            }
            if (response?.error)
               toast({
                  title: 'Uh oh! Something went wrong.',
                  description: response?.error?.toString(),
                  variant: 'destructive'
               });
         })
         .catch((error) => {
            console.log(error);
         });
   }

   return (
      <div className={cn('grid gap-10', className)} {...props}>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <FormField
                  control={form.control}
                  name="mail"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input placeholder="example@company.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                           <Input placeholder="password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? '...' : 'Sign in'}
               </Button>

               <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                     <span className="w-full border-t" />
                  </div>

                  <div className="relative flex justify-center text-xs uppercase">
                     <span className="bg-background px-2 text-muted-foreground">
                        I don&rsquo;t have an account
                     </span>
                  </div>
               </div>

               <div />
               <Link href="/auth/register">
                  <Button className="w-full" variant="outline" type="button">
                     Register
                  </Button>
               </Link>
            </form>
         </Form>
      </div>
   );
}
