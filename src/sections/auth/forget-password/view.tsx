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
import { forgotPassword } from '@/lib/api/auth';
import { getError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AuthLayout from '../layout';

export const formSchema = z.object({
   mail: z.string().email()
});

export default function PasswordForgetView() {
   const { toast } = useToast();

   const form = useForm<z.infer<typeof formSchema>>({
      // @ts-ignore
      resolver: zodResolver(formSchema),
      defaultValues: {
         mail: ''
      }
   });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
         const res = await forgotPassword(values.mail);
         if (res.status === 200) {
            toast({
               title: 'Success',
               description: 'Check your email'
            });
         }
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

               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? '...' : 'Send reset link'}
               </Button>
            </form>
         </Form>
      </AuthLayout>
   );
}
