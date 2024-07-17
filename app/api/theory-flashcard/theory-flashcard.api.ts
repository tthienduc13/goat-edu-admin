import * as z from 'zod';
import axiosClient from '@/lib/axiosClient';

import { TheoryFlashCardContent } from '@/types/theory-flashcard-content';
import {
  FlashcardContentItemSchema,
  TheoryFlashcardSchema
} from '@/schemas/theory-flashcard';

const END_POINT = {
  GET_THEORY_FLASHCARD_CONTENT: 'theory_flashcard/theory',
  CREATE: '/theory_flashcard/theory',
  GET_BY_ID: '/theory_flashcard/theory',
  PATCH_BY_ID: '/theory_flashcard/theory',
  DELETE_FLASHCARD_CONTENT: '/theory_flashcard'
};

export type FlashcardContentResponse = {
  id: string;
  question: string;
  answer: string;
  status: string;
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

export const patchFlashcardContentTheoryById = async ({
  token,
  values,
  id
}: {
  token: string;
  id: string;
  values: FlashcardContentResponse[];
}) => {
  const response = await axiosClient.patch(
    `${END_POINT.PATCH_BY_ID}/${id}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteFlashcardContent = async (id: string, token: string) => {
  const response = await axiosClient.delete(
    `${END_POINT.DELETE_FLASHCARD_CONTENT}?guids=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
