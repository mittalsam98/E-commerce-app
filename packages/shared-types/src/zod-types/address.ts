import { z } from 'zod';

//SignUp
export const addressSchema = z.object({
  city: z
    .string({
      required_error: 'City name is required',
      invalid_type_error: 'City name must be a string'
    })
    .min(1, 'Please enter valid City'),
  zipCode: z
    .number({
      required_error: 'ZipCode is required',
      invalid_type_error: 'ZipCode must be a valid number'
    })
    .min(1, 'Please enter valid ZipCode'),
  state: z
    .string({
      required_error: 'State is required',
      invalid_type_error: 'State must be a string'
    })
    .min(1, 'Please enter valid State'),
  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string'
    })
    .min(1, 'Please enter valid Country'),

  phoneNumber: z.number({
    required_error: 'Phone number is required',
    invalid_type_error: 'Phone number must be a valid number'
  })
});

//SignUp
export type AddressParams = z.infer<typeof addressSchema>;
