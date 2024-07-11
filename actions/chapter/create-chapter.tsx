import { createChapter } from '@/app/api/chapter/chapter.api';
import { ChapterSchema } from '@/schemas';
import * as z from 'zod';
export const CreateChapterAction = async (
  token: string,
  subjectId: string,
  values: z.infer<typeof ChapterSchema>
) => {
  const validatedFields = ChapterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { chapterName, chapterLevel } = validatedFields.data;

  const newChapterData = {
    chapterName,
    chapterLevel
  };

  const response = await createChapter(token, subjectId, newChapterData);

  return response;
};
