import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const CheckEmailSchema = z.object({
  email: z.string().email()
});

export const AddModerSchema = z.object({
  fullname: z.string().min(4, 'Fullname needs a minimum length of 4'),
  username: z.string().min(4, 'Username needs a minimum length of 4'),
  email: z.string().email('This field is required'),
  phoneNumber: z.string().refine((val) => /^0\d{9}$/.test(val), {
    message: 'Phone number must start with 0 and have exactly 10 digits'
  })
});

export const SubjectSchema = z.object({
  subjectName: z.string().min(5, 'Subject name needs a minimum length of 10'),
  subjectImage: z.any().optional(),
  subjectCode: z.string().refine((val) => /^[A-Z]{3,4}\d{3}$/.test(val), {
    message: 'You need to follow the code format'
  }),
  subjectInformation: z
    .string()
    .min(20, 'Subject information needs a minimum length of 20'),
  subjectClass: z.string().min(1, 'Class required')
});

export const ChapterSchema = z.object({
  chapterName: z.string().min(10, 'Chapter name needs a minium length of 10'),
  chapterLevel: z.coerce
    .number()
    .positive('Chapter level can not be 0 or negative')
    .refine((value) => value !== 0, {
      message: 'Chapter level cannot be 0'
    })
});

export const LessonSchema = z.object({
  lessonName: z.string().min(10, 'Lesson name needs a minium length of 10'),
  lessonBody: z
    .string()
    .min(20, 'Lesson description needs a minium length of 20'),
  displayOrder: z.coerce
    .number()
    .positive('Display order level can not be 0 or negative')
    .refine((value) => value !== 0, {
      message: 'Display order level cannot be 0'
    })
});

export const TheoryFlashcardSchema = z.object({
  flashcardContent: z
    .array(
      z.object({
        question: z
          .string({
            required_error: 'This field is required_error'
          })
          .min(1, { message: 'Question cannot be blank' })
          .max(50, { message: 'Question is not exceed 150 characters' }),
        answer: z
          .string({
            required_error: 'This field is required_error'
          })
          .min(1, { message: 'Answer cannot be blank' })
          .max(50, { message: 'Answer is not exceed 150 characters' })
      })
    )
    .min(3, { message: 'Flashcard sets must contain at least 3 cards' })
});

export const QuestionInQuizSchema = z.object({
  quiz: z.array(
    z.object({
      quizQuestion: z
        .string({
          required_error: 'This field is required_error'
        })
        .min(1, { message: 'Question cannot be blank' })
        .max(50, { message: 'Question is not exceed 150 characters' }),
      quizAnswer1: z
        .string({
          required_error: 'This field is required_error'
        })
        .min(1, { message: 'Answer1 cannot be blank' })
        .max(50, { message: 'Answer1 is not exceed 150 characters' }),
      quizAnswer2: z
        .string({
          required_error: 'This field is required_error'
        })
        .min(1, { message: 'Answer2 cannot be blank' })
        .max(50, { message: 'Answer2 is not exceed 150 characters' }),
      quizAnswer3: z
        .string({
          required_error: 'This field is required_error'
        })
        .min(1, { message: 'Answer3 cannot be blank' })
        .max(50, { message: 'Answer3 is not exceed 150 characters' }),
      quizCorrect: z
        .string({
          required_error: 'This field is required_error'
        })
        .min(1, { message: 'Correct Answer cannot be blank' })
        .max(50, { message: 'Correct Answer  is not exceed 150 characters' })
    })
  )
});
