import { createChapter, updateChapter } from '@/app/api/chapter/chapter.api';
import { ChapterSchema } from '@/schemas';
import * as z from 'zod';
export const UpdateChapterAction = async (
  token: string,
  chapterId: string,
  values: z.infer<typeof ChapterSchema>
) => {
  const validatedFields = ChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { chapterName, chapterLevel } = validatedFields.data;

  const newSubjectData = {
    chapterName,
    chapterLevel
  };

  const response = await updateChapter(chapterId, newSubjectData, token);

  return response;
};
