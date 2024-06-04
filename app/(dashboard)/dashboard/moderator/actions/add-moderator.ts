'use server';
import { addModer } from '@/app/api/user/user.api';
import { AddModerSchema } from '@/schemas';
import * as z from 'zod';

export const AddModer = async (
  values: z.infer<typeof AddModerSchema>,
  token: string | undefined
) => {
  const validatedFields = AddModerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { email, username, fullname, phoneNumber } = validatedFields.data;

  const newUserData = { email, username, fullname, phoneNumber };

  const response = await addModer(newUserData, token);
  // if (response.data.status === 400 || response.data.status === 404) {
  //   return { error: response.data.message };
  // }

  // return { success: response.data.message };
  return response;
};
