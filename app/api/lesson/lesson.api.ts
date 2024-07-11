import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { Lesson } from '@/types/lesson';
const END_POINT = {
  GET_LESSON: '/lesson/chapter',
  DELETE_LESSON: '/lesson?lessonnId'
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
    `${END_POINT.GET_LESSON}/${chapterId}?${params.toString()}`,
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
