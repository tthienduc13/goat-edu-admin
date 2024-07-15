import axiosClient from '@/lib/axiosClient';
import { TheoryFlashcardSchema } from '@/schemas';
import { TheoryFlashCardContent } from '@/types/theory-flashcard-content';
import * as z from 'zod';

export const END_POINT = {
  CREATE: '/theory_flashcard/theory',
  GET_BY_ID: '/theory_flashcard/theory'
};

export const createTheoryFlashcard = async ({
  token,
  values,
  theoryId
}: {
  token: string;
  theoryId: string;
  values: z.infer<typeof TheoryFlashcardSchema>;
}) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE}/${theoryId}`,
    values.flashcardContent,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getTheoryFlashcard = async ({
  token,
  theoryId
}: {
  token: string;
  theoryId: string;
}): Promise<TheoryFlashCardContent[]> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${theoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
