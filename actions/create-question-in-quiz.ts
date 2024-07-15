'use server';

import * as z from 'zod';

import { currentUser } from '@/lib/auth';
import { QuestionInQuizSchema } from '@/schemas';
import { createQuestionInQuiz } from '@/app/api/question-in-quiz/question-in-quiz.api';

export const CreateQuestionQuiz = async ({
  values,
  quizId
}: {
  values: z.infer<typeof QuestionInQuizSchema>;
  quizId: string;
}) => {
  const user = await currentUser();

  const validatedFields = QuestionInQuizSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const response = await createQuestionInQuiz({
    token: user?.token!,
    values: validatedFields.data,
    quizId: quizId
  });

  if (response.status === 400 || response.status === 404) {
    return { error: response.message };
  }

  return { success: response.message, data: response.data };
};
