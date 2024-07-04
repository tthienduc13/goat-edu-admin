import { updateSubjectById } from '@/app/api/subject/subject.api';
import { EditSubjectSchema } from '@/schemas';
import * as z from 'zod';
export const UpdateSubject = async (
  values: z.infer<typeof EditSubjectSchema>,
  id: string,
  token: string
) => {
  const validatedFields = EditSubjectSchema.safeParse(values);

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
