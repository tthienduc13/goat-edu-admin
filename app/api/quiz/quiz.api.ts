import axiosClient from '@/lib/axiosClient';
import { QuizSchema } from '@/schemas/quiz';
import { Quiz } from '@/types/quiz';
import * as z from 'zod';

const END_POINT = {
  GET_QUIZ: '/quiz',
  CREATE_QUIZ: '/quiz/lesson/'
};

export const getQuizById = async (id: string, token: string): Promise<Quiz> => {
  const response = await axiosClient.get(`${END_POINT.GET_QUIZ}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const getQuizByType = async (
  typeId: string,
  type: string,
  token: string
): Promise<Quiz> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_QUIZ}?id=${typeId}&type=${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data[0];
};

export const createQuiz = async (
  lessonId: string,
  token: string,
  values: z.infer<typeof QuizSchema>
) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE_QUIZ}/${lessonId}`,
    {
      quiz1: values.quizName,
      quizLevel: values.quizLevel,
      isRequire: true
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
