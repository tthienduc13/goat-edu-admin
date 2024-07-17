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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EditFlashcardContentForm } from './edit-theory-flashcard-content';

interface LessonFlashCardProps {
  lessonName: string;
  lessonId: string;
  token: string;
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}

const LessonFlashCard = ({
  lessonName,
  lessonId,
  token,
  params
}: LessonFlashCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [theoryId, setTheoryId] = useState<string>('');
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
        setTheoryId(theory.id);
        const response = await getTheoryFlashcardContentByTheory({
          id: theory.id,
          token: token
        });
        setFlashcardContentData(response);
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

  if (!theoryId) {
    <div className="w-full">
      <Empty />
      <h3 className="font-medium">
        Look like this lesson does not has a theory section
      </h3>
      <div className="flex w-full justify-center">
        <Link
          href={`/dashboard/subject/${params.subjectId}/chapter/${params.chapterId}/lesson/${params.lessonId}/theory/create`}
        >
          <Button>Create</Button>
        </Link>
      </div>
    </div>;
  } else {
    if (
      !flashcardContentData ||
      !Array.isArray(flashcardContentData) ||
      flashcardContentData.length === 0
    ) {
      return (
        <div className="w-full">
          <Empty />
          <div className="flex w-full justify-center">
            <Link
              href={`/dashboard/subject/${params.subjectId}/chapter/${params.chapterId}/lesson/${params.lessonId}/theory/${theoryId}/create-theory-flashcard`}
            >
              <Button>Create</Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex min-h-[calc(100vh-64px)]  w-full flex-col gap-y-10 p-8">
          <EditFlashcardContentForm
            theoryId={theoryId}
            initialData={flashcardContentData}
            token={token}
          />
        </div>
      );
    }
  }
};

export default LessonFlashCard;
