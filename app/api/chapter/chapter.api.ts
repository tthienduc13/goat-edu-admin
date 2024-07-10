import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { ChapterSchema } from '@/schemas';
import * as z from 'zod';

const END_POINT = {
  CREAT_CHAPTER: '/chapter'
};

export const createChapter = async (
  token: string,
  subjectId: string,
  values: z.infer<typeof ChapterSchema>
) => {
  const response = await axiosClient.post(
    `${END_POINT.CREAT_CHAPTER}`,
    {
      chapterName: values.chapterName,
      subjectId: subjectId,
      chapterLevel: values.chapterLevel
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.status;
};
