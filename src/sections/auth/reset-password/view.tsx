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
import { getError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AuthLayout from '../layout';

export const formSchema = z.object({
   password1: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
   password2: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

export default function PasswordResetView({ token }: { token: string }) {
   const { toast } = useToast();

   const form = useForm<z.infer<typeof formSchema>>({
      // @ts-ignore
      resolver: zodResolver(formSchema),
      defaultValues: {
         password1: '',
         password2: ''
      }
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      if (values.password1 !== values.password2) {
         toast({
            title: 'Passwords do not match',
            description: 'Please try again.',
            variant: 'destructive'
         });
         return;
      }

      try {
         await signIn('Credentials', {
            resetKey: token,
            password: values.password1,
            redirect: false
         })
            .then((response) => {
               if (!response?.error && response?.ok) {
                  toast({
                     title: 'Password reset successfully'
                  });
                  window.location.href = '/dashboard';
               }
               if (response?.error)
                  toast({
                     title: 'Uh oh! Something went wrong.',
                     description: response?.error?.toString(),
                     variant: 'destructive'
                  });
            })
            .catch((error) => {
               toast({
                  title: 'Uh oh! Something went wrong.',
                  description: getError(error),
                  variant: 'destructive'
               });
            });
      } catch (error) {
         toast({
            title: 'Error',
            description: getError(error),
            variant: 'destructive'
         });
      }
   }

   return (
      <AuthLayout type="reset">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                  control={form.control}
                  name="password1"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                           <Input placeholder="New password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password2"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                           <Input placeholder="confirm password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? '...' : 'Reset Password'}
               </Button>
            </form>
         </Form>
      </AuthLayout>
   );
}
