'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  mail: z.string().email(),
  password: z.string()
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

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
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button className="w-full" variant="outline" type="button">
            Google
          </Button>
        </form>
      </Form>
    </div>
  );
}
