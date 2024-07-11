import { updateSubjectById } from '@/app/api/subject/subject.api';
import { SubjectSchema } from '@/schemas';
import * as z from 'zod';
export const UpdateSubjectAction = async (
  values: z.infer<typeof SubjectSchema>,
  id: string,
  token: string
) => {
  const validatedFields = SubjectSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const {
    subjectName,
    subjectImage,
    subjectCode,
    subjectInformation,
    subjectClass
  } = validatedFields.data;

  const newSubjectData = {
    subjectName,
    subjectImage,
    subjectCode,
    subjectInformation,
    subjectClass
  };

  const response = await updateSubjectById(id, token, newSubjectData);

  return response;
};
