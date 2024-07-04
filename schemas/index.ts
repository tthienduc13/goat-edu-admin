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

export const EditSubjectSchema = z.object({
  subjectName: z.string().min(10, 'Subject name needs a minimum length of 10'),
  subjectImage: z.any().optional(),
  subjectCode: z.string().refine((val) => /^[A-Z]{3,4}\d{3}$/.test(val), {
    message: 'You need to follow the code format'
  }),
  subjectInformation: z
    .string()
    .min(20, 'Subject information needs a minimum length of 20'),
  subjectClass: z.string().min(1, 'Class required')
});
