import * as z from 'zod';
import axiosClient from '@/lib/axiosClient';
import { TheoryFlashcardSchema } from '@/schemas';
import { TheoryFlashCardContent } from '@/types/theory-flashcard-content';

const END_POINT = {
  GET_THEORY_FLASHCARD_CONTENT: 'theory_flashcard/theory',
  CREATE: '/theory_flashcard/theory',
  GET_BY_ID: '/theory_flashcard/theory'
};

export const getTheoryFlashcardContentByTheory = async ({
  id,
  token
}: {
  id: string;
  token: string;
}): Promise<TheoryFlashCardContent[]> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_THEORY_FLASHCARD_CONTENT}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
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
