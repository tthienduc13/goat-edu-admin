import { Discussion, Status } from '@/types/discussion';
import axiosClient from '@/lib/axiosClient';
export const END_POINT = {
  GET_BY_ID: '/discussion',
  GET_BY_USER: '/discussion/user',
  GET_ALL: '/discussion',
  CREATE: '/discussion',
  APPROVE: '/moder/discussion'
};

export const getAllDiscussion = async ({
  token,
  sort,
  sortDirection,
  search,
  status,
  pageNumber,
  pageSize
}: {
  token: string;
  sort?: string;
  sortDirection?: string;
  search?: string;
  status?: Status;
  pageNumber?: number;
  pageSize?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (sort) {
      queryParams.append('sort', sort);
    }
    if (sortDirection) {
      queryParams.append('sort_direction', sortDirection);
    }
    if (search) {
      queryParams.append('search', search);
    }
    if (status) {
      queryParams.append('status', status);
    }
    if (pageSize) {
      queryParams.append('page_size', pageSize.toString());
    }
    if (pageNumber) {
      queryParams.append('page_number', pageNumber.toString());
    }

    const response = await axiosClient.get(
      `${END_POINT.GET_ALL}?${queryParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response;
  } catch (error) {
    console.error('Error fetching discussions:', error);
    throw error;
  }
};

export const getDiscussionById = async ({
  token,
  id
}: {
  token: string;
  id: string;
}): Promise<Discussion> => {
  const response = await axiosClient.get(`${END_POINT.GET_BY_ID}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.data;
};

export const approveDiscussion = async ({
  token,
  id
}: {
  token: string;
  id: string;
}) => {
  const response = await axiosClient.post(
    `${END_POINT.APPROVE}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data;
};
