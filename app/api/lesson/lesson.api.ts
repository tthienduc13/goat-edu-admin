import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { LessonSchema } from '@/schemas';
import { Lesson } from '@/types/lesson';
import * as z from 'zod';
const END_POINT = {
  GET_LESSON_BY_CHAPTER: '/lesson/chapter',
  DELETE_LESSON: '/lesson?lessonnId',
  CREATE_LESSON: '/lesson/chapter',
  GET_LESSON: '/lesson'
};

export const getLessonByChapter = async ({
  chapterId,
  token,
  sort,
  sortDirection,
  pageSize,
  pageNumber
}: {
  chapterId: string;
  token: string;
  sort?: string;
  sortDirection?: string;
  pageSize?: number;
  pageNumber?: number;
}) => {
  const params = new URLSearchParams();
  if (sort) params.append('sort', sort);
  if (sortDirection) params.append('sort_direction', sortDirection);
  if (pageSize) params.append('page_size', pageSize.toString());
  if (pageNumber) params.append('page_number', pageNumber.toString());
  const reposne = await axiosClient.get(
    `${END_POINT.GET_LESSON_BY_CHAPTER}/${chapterId}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return reposne;
};

export const deleteLesson = (id: string, token: string) => {
  const response = axiosClient.delete(`${END_POINT.DELETE_LESSON}=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

export const createLesson = async (
  chapterId: string,
  token: string,
  values: z.infer<typeof LessonSchema>
) => {
  const response = await axiosClient.post(
    `${END_POINT.CREATE_LESSON}/${chapterId}`,
    {
      lessonName: values.lessonName,
      lessonBody: values.lessonBody,
      lessonMaterial: 'a',
      displayOrder: values.displayOrder
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.status;
};

export const getLessonById = async (
  id: string,
  token: string
): Promise<Lesson> => {
  const response = await axiosClient.get(`${END_POINT.GET_LESSON}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};

export const updateLesson = async (
  lessonId: string,
  token: string,
  values: z.infer<typeof LessonSchema>
) => {
  const response = await axiosClient.patch(
    `${END_POINT.GET_LESSON}/${lessonId}`,
    {
      lessonName: values.lessonName,
      lessonBody: values.lessonBody,
      lessonMaterial: 'a',
      displayOrder: values.displayOrder
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.status;
};
