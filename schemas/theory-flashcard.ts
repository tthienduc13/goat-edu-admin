import * as z from 'zod';

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

export const FlashcardContentItemSchema = z.object({
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
});
