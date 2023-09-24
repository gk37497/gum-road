import * as z from 'zod';
import { addAffliateFormSchema, addProductformSchema } from './validations';

export type TAddProduct = z.infer<typeof addProductformSchema>;
export type TAddAffliate = z.infer<typeof addAffliateFormSchema>;
