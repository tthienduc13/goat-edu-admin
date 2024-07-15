import axiosClient from '@/lib/axiosClient';
import { QuestionInQuizSchema } from '@/schemas';
import * as z from 'zod';

export const END_POINT = {
  CREATE: '/question/quiz'
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
