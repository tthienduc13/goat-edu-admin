import { createLesson } from '@/app/api/lesson/lesson.api';
import { LessonSchema } from '@/schemas';
import * as z from 'zod';
export const CreateLessonAction = async (
  token: string,
  chapterId: string,
  values: z.infer<typeof LessonSchema>
) => {
  const validatedFields = LessonSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { displayOrder, lessonBody, lessonName } = validatedFields.data;

  const newLessontData = {
    displayOrder,
    lessonBody,
    lessonName
  };

  const response = await createLesson(chapterId, token, newLessontData);

  return response;
};
