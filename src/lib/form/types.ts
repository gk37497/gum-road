import * as z from 'zod';
import { addAffliateFormSchema, addProductformSchema, buyProductFormSchema } from './validations';

export type TAddProduct = z.infer<typeof addProductformSchema>;
export type TAddAffliate = z.infer<typeof addAffliateFormSchema>;
export type TBuyProduct = z.infer<typeof buyProductFormSchema>;
