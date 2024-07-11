import { Discussion, Status } from '@/types/discussion';
import axiosClient from '@/lib/axiosClient';
export const END_POINT = {
  GET_BY_ID: '/discussion',
  GET_BY_USER: '/discussion/user',
  GET_ALL: '/discussion',
  CREATE: '/discussion'
};

export const getAllDiscussion = async ({
  token,
  sort,
  search,
  status,
  pageNumber,
  pageSize
}: {
  token: string;
  sort?: string;
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

    console.log(queryParams);

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
