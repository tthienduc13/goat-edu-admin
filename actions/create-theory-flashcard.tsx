'use server';

import * as z from 'zod';

import { currentUser } from '@/lib/auth';
import { TheoryFlashcardSchema } from '@/schemas/theory-flashcard';
import { createTheoryFlashcard } from '@/app/api/theory-flashcard/theory-flashcard.api';

export const CreateTheoryFlashcard = async ({
  values,
  theoryId
}: {
  values: z.infer<typeof TheoryFlashcardSchema>;
  theoryId: string;
}) => {
  const user = await currentUser();

  const validatedFields = TheoryFlashcardSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const response = await createTheoryFlashcard({
    token: user?.token!,
    values: validatedFields.data,
    theoryId: theoryId
  });

  if (response.status === 400 || response.status === 404) {
    return { error: response.message };
  }

  return { success: response.message, data: response.data };
};
