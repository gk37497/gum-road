import * as z from 'zod';
import { addProductformSchema } from './validations';

export type TAddProduct = z.infer<typeof addProductformSchema>;
