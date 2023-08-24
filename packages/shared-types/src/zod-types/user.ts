import { z } from 'zod';

//SignUp
export const updateUserSchema = z.object({
  id: z.string(),
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string'
    })
    .min(2, 'First name must contain 2 letters'),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string'
    })
    .min(2, 'Last name must contain 2 letters'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email('Please enter valid email'),
  isAdmin: z.boolean()
});

//SignUp
export type UpdateUserSchemaParams = z.infer<typeof updateUserSchema>;
