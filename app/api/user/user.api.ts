import { AddModerSchema } from '@/schemas';
import axiosClient from '@/lib/axiosClient';
import * as z from 'zod';

const ENDPOINT = {
  GET_AUTHORIZE_USER: '/admin/authorize/user?',
  GET_MODERATION: 'admin/moderator?',
  DELETE_USER: '/admin/user?id=',
  ADD_MODERATOR: '/admin/user'
};

export const getAuthorizeUser = async (
  pageSize: number,
  pageNumber: number,
  token: string | undefined
) => {
  const response = await axiosClient.get(
    `${ENDPOINT.GET_AUTHORIZE_USER}page_size=${pageSize}&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const getModer = async (
  pageSize: number,
  pageNumber: number,
  token: string | undefined
) => {
  const response = await axiosClient.get(
    `${ENDPOINT.GET_MODERATION}page_size=${pageSize}&page_number=${pageNumber}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};

export const deleteUserById = async (id: string, token: string | undefined) => {
  const response = await axiosClient.delete(`${ENDPOINT.DELETE_USER}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const addModer = async (
  values: z.infer<typeof AddModerSchema>,
  token: string | undefined
) => {
  const response = await axiosClient.post(
    ENDPOINT.ADD_MODERATOR,
    {
      username: values.username,
      email: values.email,
      fullName: values.fullname,
      phoneNumber: values.phoneNumber
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  console.log(response.status);
  return response.data;
};
