'use client';
import { getQuizByType } from '@/app/api/quiz/quiz.api';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Quiz } from '@/types/quiz';
import { useEffect, useState } from 'react';

interface LessonQuizProps {
  lessonId: string;
  lessonName: string;
  token: string;
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}
const LessonQuiz = ({
  lessonId,
  lessonName,
  token,
  params
}: LessonQuizProps) => {
  const [quiz, setQuiz] = useState<Quiz>();
  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await getQuizByType(lessonId, 'lesson', token);
      setQuiz(response);
    };
    fetchQuiz();
  }, [lessonId]);
  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        <Heading
          title="Quiz information"
          description="Manage Subject (Client side table functionalities.)"
        />
        <Separator />
      </div>
    </div>
  );
};
export default LessonQuiz;
