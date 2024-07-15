import axiosClient, { axiosClientUpload } from '@/lib/axiosClient';
import { Theory } from '@/types/theory';

const END_POINT = {
  GET_THEORY_BY_LESSON: '/theory/lesson',
  UPDATE_THEORY: '/theory',
  CREATE_THEORY: '/theory'
};

export const getTheoryByLesson = async ({
  lessonId,
  token
}: {
  token: string;
  lessonId: string;
}): Promise<Theory> => {
  const response = await axiosClient.get(
    `${END_POINT.GET_THEORY_BY_LESSON}/${lessonId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response.data[0];
};

export const updateTheory = async (
  theoryId: string,
  token: string,
  theoryContent: string,
  theoryContentHtml: string
) => {
  const response = await axiosClientUpload.patch(
    `${END_POINT.UPDATE_THEORY}/${theoryId}`,
    {
      TheoryName: '',
      TheoryContent: theoryContent,
      TheoryContentHtml: theoryContentHtml
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response;
};

export const createTheory = async (
  token: string,
  theoryContent: string,
  theoryContentHtml: string,
  lessonId: string
) => {
  const response = await axiosClientUpload.post(
    `${END_POINT.UPDATE_THEORY}`,
    {
      TheoryName: 'name',
      TheoryContent: theoryContent,
      TheoryContentHtml: theoryContentHtml,
      LessonId: lessonId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return response;
};
