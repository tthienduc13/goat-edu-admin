import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { EditSubjectSchema } from '@/schemas';
import { Subject } from '@/types/subject';
import * as z from 'zod';
const END_POINT = {
  GET_SUBJECT: '/subject',
  GET_BY_ID: '/subject',
  PATCH_SUBJECT: '/subject',
  DELETE_SUBJECT: '/subject'
};

export const getSubject = async (
  token: string,
  pageSize: number,
  pageNum: number
) => {
  const response = await axiosClient.get(
    `${END_POINT.GET_SUBJECT}?page_size=${pageSize}&page_number=${pageNum}`
  );
  // const data = response.headers.get('x-pagination');
  return response;
};

export const getSubjectById = async (
  id: string,
  token: string
): Promise<Subject> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateSubjectById = async (
  id: string,
  token: string,
  values: z.infer<typeof EditSubjectSchema>
) => {
  const response = await axiosClientUpload.patch(
    `${END_POINT.PATCH_SUBJECT}/${id}`,
    {
      SubjectName: values.subjectName,
      image: values.subjectImage,
      SubjectCode: values.subjectCode,
      Information: values.subjectInformation,
      Class: values.subjectClass
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }
  );
  return response.status;
};

export const deleteSubject = async (id: string, token: string) => {
  const response = await axiosClient.delete(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};
