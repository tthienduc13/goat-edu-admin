import * as z from 'zod';

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

export const QuizSchema = z.object({
  quizName: z.string().min(1, 'Quiz name is required !'),
  quizLevel: z.coerce.number().refine((value) => value >= 0, {
    message: 'Quiz level cannot be negative'
  })
});
