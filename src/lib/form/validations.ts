import * as z from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/JPEG'];

export const addProductformSchema = z.object({
  storeName: z.string().min(3, { message: 'Store name must be at least 3 characters long.' }),
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  price: z.string().min(4, { message: 'Price must be at least 1 character long.' }),
  description: z.string().min(10, { message: 'Description must be at least 3 characters long.' }),
  term: z.string(),
  cover: z
    .object({
      file: z
        .any()
        .refine((file) => !!file, 'Image is required.')
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
      preview: z.string()
    })
    .optional(),
  thumbnail: z
    .object({
      file: z
        .any()
        .refine((file) => !!file, 'Image is required.')
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
          '.jpg, .jpeg, .png and .webp files are accepted.'
        ),
      preview: z.string()
    })
    .optional(),
  summary: z.string(),
  additionalInformation: z.array(
    z.object({
      attribute: z.string(),
      value: z.string()
    })
  ),
  options: z.array(
    z.object({
      price: z.string().default(''),
      duration: z.string(),
      type: z.string(),
      enabled: z.boolean().default(false).optional()
    })
  )
});

export const addAffliateFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  list: z.array(
    z
      .object({
        enabled: z.boolean().default(false).optional(),
        productId: z.string().min(1, { message: 'Product ID is required.' }),
        commission: z.number().optional()
      })
      .superRefine((data, ctx) => {
        // if enabled is true, then commission and productId must be provided
        if (data.enabled) {
          if (!data.commission) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Commission is required.'
            });
          }

          if (!data.productId) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Product ID is required.'
            });
          }
        }
      })
  )
});
