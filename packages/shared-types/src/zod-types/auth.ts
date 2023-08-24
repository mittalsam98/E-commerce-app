import { z } from 'zod';

//SignUp
export const signupSchema = z.object({
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
  password: z.string().min(6,'Enter valid password')
});

//SignUp
export type SignupParams = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email('Please enter valid email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .nonempty('Password is required')
});
export type SignInParams = z.infer<typeof loginSchema>;

// JWT
export interface JWTPayload {
  id: string;
}
