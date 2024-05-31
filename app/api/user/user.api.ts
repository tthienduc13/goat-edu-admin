import { axiosClientUpload } from '@/lib/axiosClient';

const ENDPOINT = {
  GET_USER: '/admin/user?',
  DELETE_USER: '/admin/user?id='
};

export const getUser = async (pageSize: number, pageNumber: number) => {
  const response = await axiosClientUpload.get(
    `${ENDPOINT.GET_USER}PageSize=${pageSize}&PageNumber=${pageNumber}`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRoYW5oZGVwdHJhaSIsIlVzZXJJZCI6ImY0OTFjMGJjLWU1YjAtNGZjNy1hY2JmLWNiMDFlYjQzZWVjZSIsIlJvbGVJZCI6IjE5MDU5OGZlLWRmMzEtNGVhMi1hYmUzLWFiOTA1MGJlMDY5ZSIsInJvbGUiOiJBZG1pbiIsIkZ1bGxuYW1lIjoiTmd1eWVuVGhhbmgiLCJuYmYiOjE3MTcwNTgzNDEsImV4cCI6MTcxNzY2MzE0MSwiaWF0IjoxNzE3MDU4MzQxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.g55iKZX53rF517AtfML_LDv6HPElYMdvVDW-Z4IUPhc'
      }
    }
  );
  return response.data;
};

export const deleteUserById = async (id: string) => {
  const response = await axiosClientUpload.delete(
    `${ENDPOINT.DELETE_USER}${id}`,
    {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InRoYW5oZGVwdHJhaSIsIlVzZXJJZCI6ImY0OTFjMGJjLWU1YjAtNGZjNy1hY2JmLWNiMDFlYjQzZWVjZSIsIlJvbGVJZCI6IjE5MDU5OGZlLWRmMzEtNGVhMi1hYmUzLWFiOTA1MGJlMDY5ZSIsInJvbGUiOiJBZG1pbiIsIkZ1bGxuYW1lIjoiTmd1eWVuVGhhbmgiLCJuYmYiOjE3MTcwNTgzNDEsImV4cCI6MTcxNzY2MzE0MSwiaWF0IjoxNzE3MDU4MzQxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.g55iKZX53rF517AtfML_LDv6HPElYMdvVDW-Z4IUPhc'
      }
    }
  );
  return response.data;
};
