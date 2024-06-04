import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const CheckEmailSchema = z.object({
  email: z.string().email()
});

export const AddModerSchema = z.object({
  fullname: z.string().min(4, 'Fullname needs a minimum length of 4'),
  username: z.string().min(4, 'Username needs a minimum length of 4'),
  email: z.string().email('This field is required'),
  phoneNumber: z.string().refine((val) => /^0\d{9}$/.test(val), {
    message: 'Phone number must start with 0 and have exactly 10 digits'
  })
});
