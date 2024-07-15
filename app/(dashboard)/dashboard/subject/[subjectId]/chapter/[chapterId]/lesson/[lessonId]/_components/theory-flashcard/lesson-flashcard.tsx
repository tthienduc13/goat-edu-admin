'use client';
import { useEffect, useState } from 'react';
import FlashcardLoading from './lesson-flashcard-loading';
import {
  FlashcardContent,
  TheoryFlashCardContent
} from '@/types/theory-flashcard-content';
import Empty from '@/app/(dashboard)/dashboard/subject/_components/empty-state';
import { getTheoryFlashcardContentByTheory } from '@/app/api/theory-flashcard/theory-flashcard.api';
import { getTheoryByLesson } from '@/app/api/theory/theory.api';

interface LessonFlashCardProps {
  lessonName: string;
  lessonId: string;
  token: string;
}

const LessonFlashCard = ({
  lessonName,
  lessonId,
  token
}: LessonFlashCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flashcardContentData, setFlashcardContentData] =
    useState<TheoryFlashCardContent[]>();
  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        setIsLoading(!isLoading);
        const theory = await getTheoryByLesson({
          lessonId: lessonId,
          token: token
        });
        const response = await getTheoryFlashcardContentByTheory({
          id: theory.id,
          token: token
        });
        setFlashcardContentData(response);
        console.log(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchFlashcard();
  }, [lessonId]);

  if (isLoading) {
    return <FlashcardLoading />;
  }
  if (
    !flashcardContentData ||
    !Array.isArray(flashcardContentData) ||
    flashcardContentData.length === 0
  ) {
    return <Empty />;
  }

  const data: FlashcardContent[] = flashcardContentData.map((flashcard) => ({
    id: flashcard.id,
    frontHTML: flashcard.question,
    backHTML: flashcard.answer
  }));

  return (
    <div className="w-full space-y-4">
      <h1 className="text-3xl font-semibold">{lessonName}</h1>
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-[500px] w-[800px] ">
          hello
          {/* <ArrayFlashcard data={data} /> */}
        </div>
      </div>
    </div>
  );
};

export default LessonFlashCard;
