'use client';
import Editor from '@/components/common/editor';
import Upload from '@/components/common/upload';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAddProduct, useUploadImage } from '@/lib/api/client/use-hooks';
import { addProductDefaults } from '@/lib/form/defaults';
import { TAddProduct } from '@/lib/form/types';
import { addProductformSchema } from '@/lib/form/validations';
import { AddProductPayload } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getError } from '@/utils/api-error';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircledIcon, TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

export default function ProductForm() {
   const { toast } = useToast();
   const router = useRouter();

   const uploadImageMutation = useUploadImage();
   const addProductMutation = useAddProduct();

   const form = useForm<TAddProduct>({
      resolver: zodResolver(addProductformSchema),
      defaultValues: addProductDefaults
   });

   const { fields, append, remove } = useFieldArray({
      name: 'additionalInformation',
      control: form.control
   });
   const { fields: pricingFields } = useFieldArray({ name: 'options', control: form.control });

   async function uploadImage(file: File, type: 'cover' | 'thumbnail') {
      const formData = new FormData();
      formData.append('file', file);
      // ? Enkhee Note: coverImage gedgee zuger cover gj bolohgui l baisn yum baihdaa :(.
      formData.append('type', type === 'cover' ? 'coverImage' : 'thumbnail');

      try {
         const res = await uploadImageMutation.mutateAsync(formData);
         if (res.success) return res.body?._id;
      } catch (error) {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: getError(error),
            variant: 'destructive'
         });
      }
   }

   async function onSubmit(values: TAddProduct) {
      // TODO: make cover and thumbnail required in form validation.
      if (!values.cover || !values.thumbnail) {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: 'Cover and thumbnail are required.',
            variant: 'destructive'
         });
         return;
      }

      const options = values.options
         .filter((option) => option.enabled)
         .map((option) => ({
            duration: option.duration,
            price: option.price,
            type: option.type
         }));

      if (options.length === 0) {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: 'At least one option is required.',
            variant: 'destructive'
         });
         return;
      }

      const coverImageId = await uploadImage(values.cover?.file, 'cover');
      const thumbnailId = await uploadImage(values.thumbnail?.file, 'thumbnail');

      if (!coverImageId || !thumbnailId) return;

      const addProductPayload: AddProductPayload = {
         title: values.title,
         storeName: values.storeName,
         description: values.description,
         coverImageId,
         thumbnailId,
         summary: values.summary,
         additionalInformation: values.additionalInformation,
         term: {
            title: 'Term',
            description: values.term
         },
         options: options
      };

      try {
         const res = await addProductMutation.mutateAsync(addProductPayload);
         if (res.success) {
            toast({
               title: 'Product added successfully.',
               description: 'Product added successfully.'
            });

            form.reset();
            router.back();
         }
      } catch (error) {
         toast({
            title: 'Uh oh! Something went wrong.',
            description: error?.toString(),
            variant: 'destructive'
         });
      }
   }

   const handleDropFile = useCallback(
      (acceptedFiles: File[], name: 'cover' | 'thumbnail') => {
         const file = acceptedFiles[0];
         const newFile = Object.assign(file, { preview: URL.createObjectURL(file) });
         if (newFile)
            form.setValue(name, { preview: newFile.preview, file }, { shouldValidate: true });
      },
      [form]
   );

   return (
      <div className="relative -mt-12 grid space-x-8 md:grid-cols-2 md:pr-8">
         <div className="w-full bg-black px-8 py-20">
            <div className={cn('grid gap-10')}>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="storeName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Store Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="example" type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="Product name" type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Product Description</FormLabel>
                              <FormControl>
                                 <Editor {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="cover"
                        render={({ field }) => (
                           <FormItem className="max-w-[400px]">
                              <FormLabel>Cover</FormLabel>
                              <FormControl>
                                 <Upload
                                    {...field}
                                    file={field.value?.preview}
                                    onDrop={(a) => handleDropFile(a, 'cover')}
                                    className="min-h-36"
                                 />
                              </FormControl>
                              <p className="text-[0.8rem] font-medium text-destructive">
                                 {form.formState.errors.cover?.file?.message?.toString()}
                              </p>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                           <FormItem className="max-w-[200px]">
                              <FormLabel>Thumbnail</FormLabel>
                              <FormControl>
                                 <Upload
                                    {...field}
                                    file={field.value?.preview}
                                    onDrop={(a) => handleDropFile(a, 'thumbnail')}
                                 />
                              </FormControl>
                              <p className="text-[0.8rem] font-medium text-destructive">
                                 {form.formState.errors.thumbnail?.file?.message?.toString()}
                              </p>
                           </FormItem>
                        )}
                     />

                     <h1>Product Info</h1>

                     <div className="max-w-md space-y-8">
                        <FormField
                           control={form.control}
                           name="summary"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Summary</FormLabel>
                                 <FormControl>
                                    <Input placeholder="Summary" type="text" {...field} />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <h2>Additional Details</h2>

                        {fields.map((field, index) => (
                           <div key={field.id} className="row mt-5 flex items-end space-x-5">
                              <FormField
                                 control={form.control}
                                 name={`additionalInformation.${index}.attribute`}
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Attribute</FormLabel>
                                       <FormControl>
                                          <Input placeholder="Attribute" type="text" {...field} />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <FormField
                                 control={form.control}
                                 name={`additionalInformation.${index}.value`}
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>Value</FormLabel>
                                       <FormControl>
                                          <Input placeholder="Value" type="text" {...field} />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />

                              <Button
                                 type="button"
                                 variant={'outline'}
                                 onClick={() => remove(index)}
                              >
                                 <TrashIcon />
                              </Button>
                           </div>
                        ))}

                        <Button
                           type="button"
                           className="w-full"
                           onClick={() => append({ attribute: '', value: '' })}
                        >
                           <PlusCircledIcon className="mr-2" />
                           Add Detail
                        </Button>
                     </div>

                     <FormField
                        control={form.control}
                        name="term"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Term</FormLabel>
                              <FormControl>
                                 <Editor {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div>
                        <h2>Pricing</h2>
                        <div className="row flex max-w-lg flex-wrap gap-3">
                           {pricingFields.map((field, index) => (
                              <div key={field.id} className="row mt-5 flex items-end space-x-5">
                                 <FormField
                                    control={form.control}
                                    name={`options.${index}.enabled`}
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormControl>
                                             <Switch
                                                className="mb-2"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <FormField
                                    control={form.control}
                                    name={`options.${index}.price`}
                                    disabled={!form.getValues(`options.${index}.enabled`)}
                                    render={({ field }) => (
                                       <FormItem>
                                          <div className="row flex items-center rounded-sm border px-2">
                                             <FormControl>
                                                <Input
                                                   placeholder="Price"
                                                   type="text"
                                                   {...field}
                                                   className="max-w-[100px] border-none focus-visible:outline-none focus-visible:ring-0"
                                                />
                                             </FormControl>
                                             <div>
                                                <p className="text-xs">
                                                   / {form.getValues(`options.${index}.duration`)}{' '}
                                                   month
                                                </p>
                                             </div>
                                          </div>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                              </div>
                           ))}
                        </div>
                     </div>

                     <Button
                        type="submit"
                        className="w-full max-w-md"
                        disabled={form.formState.isSubmitting}
                        variant="brand"
                     >
                        {form.formState.isSubmitting ? '...' : 'Save'}
                     </Button>
                  </form>
               </Form>
            </div>
         </div>

         <div className="sticky top-40 mr-8 hidden h-[50vh] items-center justify-center rounded-md border border-dashed md:flex">
            <h2>Preview</h2>
         </div>
      </div>
   );
}
