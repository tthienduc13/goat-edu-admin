import { createQuiz } from '@/app/api/quiz/quiz.api';
import { QuizSchema } from '@/schemas/quiz';
import * as z from 'zod';

export const CreateQuizAction = async (
  token: string,
  lessonId: string,
  values: z.infer<typeof QuizSchema>
) => {
  const validatedFields = QuizSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { quizName, quizLevel } = validatedFields.data;

  const newLessontData = {
    quizName,
    quizLevel
  };

  const response = await createQuiz(lessonId, token, newLessontData);

  if (response.status === 400 || response.status === 404) {
    return { error: response.message };
  }

  return { success: response.message, data: response.data };
};
