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
