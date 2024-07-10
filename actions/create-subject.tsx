import { createSubject } from '@/app/api/subject/subject.api';
import { SubjectSchema } from '@/schemas';
import * as z from 'zod';
export const CreateSubjectAction = async (
  token: string,
  values: z.infer<typeof SubjectSchema>
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

  const response = await createSubject(token, newSubjectData);

  return response;
};
