import axiosClient from '@/lib/axiosClient';
import { QuestionInQuizSchema } from '@/schemas/quiz';
import * as z from 'zod';

export const END_POINT = {
  CREATE: '/question/quiz',
  PATCH_BY_QUIZ_ID: '/question/quiz',
  DELETE_QUESTION_IN_QUIZ: '/question'
};

export type QuestionInQuizzResponse = {
  id: string;
  quizQuestion: string;
  quizAnswer1: string;
  quizAnswer2: string;
  quizAnswer3: string;
  quizCorrect: string;
};

export const createQuestionInQuiz = async ({
  token,
  values,
  quizId
}: {
  token: string;
  quizId: string;
  values: z.infer<typeof QuestionInQuizSchema>;
}) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE}/${quizId}`,
    values.quiz,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const patchQuestionInQuizByQuizId = async ({
  token,
  values,
  id
}: {
  token: string;
  id: string;
  values: QuestionInQuizzResponse[];
}) => {
  const response = await axiosClient.patch(
    `${END_POINT.PATCH_BY_QUIZ_ID}/${id}`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteQuestionInQuiz = async (id: string, token: string) => {
  const response = await axiosClient.delete(
    `${END_POINT.DELETE_QUESTION_IN_QUIZ}?ids=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
