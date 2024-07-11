import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { ChapterSchema } from '@/schemas';
import { Chapter } from '@/types/chapter';
import * as z from 'zod';

const END_POINT = {
  CREAT_CHAPTER: '/chapter',
  GET_CHAPTER: '/chapter',
  DELETE_CHAPTER: '/chapter'
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

export const getChapterById = async (
  id: string,
  token: string
): Promise<Chapter> => {
  const response = await axiosClient.get(`${END_POINT.GET_CHAPTER}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateChapter = async (
  id: string,
  values: z.infer<typeof ChapterSchema>,
  token: string
) => {
  const response = await axiosClient.patch(
    `${END_POINT.GET_CHAPTER}/${id}`,
    {
      chapterName: values.chapterName,
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

export const deleteChapter = (id: string, token: string) => {
  const response = axiosClient.delete(`${END_POINT.GET_CHAPTER}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};
