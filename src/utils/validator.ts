import { z } from 'zod';

export const validator = {
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Invalid username',
    })
    .min(3, {
      message: 'Username must be at least 3 characters',
    })
    .max(20, {
      message: 'Username must be at most 20 characters',
    }),
  publicCollection: z.boolean({
    required_error: 'Public collection is required',
    invalid_type_error: 'Invalid public collection',
  }),
  publicCollectionPrice: z.boolean({
    required_error: 'Public collection price is required',
    invalid_type_error: 'Invalid public collection price',
  }),
};
