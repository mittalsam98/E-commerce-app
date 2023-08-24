import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string({
      required_error: 'Product name is required',
      invalid_type_error: 'Product name must be a string'
    })
    .min(2, 'Product name must contain 12 letters'),
  price: z.number({
    required_error: 'Product price is required',
    invalid_type_error: 'Product price must be a number'
  }),
  description: z
    .string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string'
    })
    .min(2, 'Description must contain 25 letters'),
  countInStock: z.number()
});

export type ProductParams = z.infer<typeof productSchema>;
