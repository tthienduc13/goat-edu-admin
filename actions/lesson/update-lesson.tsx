import { updateLesson } from '@/app/api/lesson/lesson.api';
import { LessonSchema } from '@/schemas';
import * as z from 'zod';
export const UpdateLessonAction = async (
  token: string,
  lessonId: string,
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

  const response = await updateLesson(lessonId, token, newLessontData);

  return response;
};
