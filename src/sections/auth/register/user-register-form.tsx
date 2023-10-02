'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
import { checkEmailAndToken, sendOTP } from '@/lib/api/auth';
import { cn } from '@/lib/utils';
import { getError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import OTPInput from 'react-otp-input';
import * as z from 'zod';

const formSchema = z.object({
   mail: z.string().email(),
   password1: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
   password2: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
   otp: z.string().min(6),
   isAccepted: z.boolean()
});

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {
   token: string;
}

export function SignUpForm({ className, token, ...props }: SignUpFormProps) {
   const { toast } = useToast();
   const [isOtpSent, setIsOtpSent] = useState(false);
   const [isOtpSending, setIsOtpSending] = useState(false);
   const params = useSearchParams();

   const form = useForm<z.infer<typeof formSchema>>({
      // @ts-ignore
      resolver: zodResolver(formSchema),
      defaultValues: {
         mail: '',
         password1: '',
         password2: '',
         otp: '',
         isAccepted: false
      },
      mode: 'onChange'
   });

   const { isSubmitting } = form.formState;

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const payload = {
         email: values.mail,
         password: values.password1,
         otp: values.otp,
         token
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
            toast({
               title: 'Uh oh! Something went wrong.',
               description: getError(error),
               variant: 'destructive'
            });
         });
   }

   async function sendOtp() {
      const values = form.getValues();

      if (!values.mail) {
         toast({
            title: 'Email is required',
            description: 'Please try again.',
            variant: 'destructive'
         });
         return;
      }

      const res = await sendOTP(values.mail);
      if (res.status === 200) {
         setIsOtpSent(true);
         toast({
            title: 'OTP sent',
            description: 'Please check your email.'
         });
      }

      setIsOtpSending(false);
   }

   async function checkEmail() {
      if (!form.getValues('mail')) return;

      const values = form.getValues();

      if (values.password1 !== values.password2) {
         toast({
            title: 'Passwords do not match',
            description: 'Please try again.',
            variant: 'destructive'
         });
         return;
      }

      if (values.password1.length < 8 && values.password2.length < 8) {
         toast({
            title: 'Password must be at least 8 characters long',
            description: 'Please try again.',
            variant: 'destructive'
         });
         return;
      }

      try {
         setIsOtpSending(true);

         const res = await checkEmailAndToken(form.getValues('mail'), token);

         if (res.status === 200) {
            await sendOtp();
            return;
         } else {
            toast({
               title: 'Uh oh! Something went wrong.',
               description: res.data.message,
               variant: 'destructive'
            });
         }
      } catch (error) {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: getError(error),
            variant: 'destructive'
         });
         setIsOtpSending(false);
      }
   }

   return (
      <div className={cn('grid gap-10', className)} {...props}>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               {!isOtpSent && (
                  <>
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
                        name="password1"
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
                  </>
               )}

               {isOtpSent && (
                  <>
                     <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>OTP</FormLabel>
                              <FormControl>
                                 <OTPInput
                                    numInputs={6}
                                    renderSeparator={() => <span className="w-4" />}
                                    renderInput={(props) => <Input {...props} />}
                                    inputStyle={{ width: 50, height: 50 }}
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="isAccepted"
                        render={({ field }) => (
                           <FormItem className="py-2">
                              <FormControl>
                                 <label className="flex items-center">
                                    <Checkbox
                                       checked={field.value}
                                       onCheckedChange={field.onChange}
                                    />
                                    <span className="ml-2 text-xs">
                                       I agree to the{' '}
                                       <a href="#" className="underline">
                                          Terms of Service
                                       </a>{' '}
                                       and{' '}
                                       <a href="#" className="underline">
                                          Privacy Policy
                                       </a>
                                       .
                                    </span>
                                 </label>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </>
               )}

               {isOtpSent ? (
                  <Button
                     type="submit"
                     className="w-full"
                     disabled={
                        isSubmitting || !form.formState.isValid || !form.getValues('isAccepted')
                     }
                  >
                     {isSubmitting ? '...' : 'Sign up'}
                  </Button>
               ) : (
                  <Button
                     className="w-full"
                     disabled={isOtpSending}
                     onClick={checkEmail}
                     type="button"
                  >
                     {isOtpSending ? '...' : 'Continue'}
                  </Button>
               )}
            </form>
         </Form>
      </div>
   );
}
