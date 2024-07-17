'use client';
import * as z from 'zod';
import { getQuizByType } from '@/app/api/quiz/quiz.api';
import { Heading } from '@/components/ui/heading';
import { QuestionInQuizSchema } from '@/schemas/quiz';
import { Quiz } from '@/types/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';

import {
  Sortable,
  SortableDragHandle,
  SortableItem
} from '@/components/ui/sortable';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileImage, Loader2, PencilLine, Plus, TrashIcon } from 'lucide-react';
import { CreateQuestionQuiz } from '@/actions/create-question-in-quiz';
import { toast } from 'sonner';
import { KeyBoardShorcuts } from '@/app/(dashboard)/dashboard/_components/theory-flashcard/keyboard-shorcuts';
import { Skeleton } from '@/components/ui/skeleton';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import Empty from '@/app/(dashboard)/dashboard/subject/_components/empty-state';
import Link from 'next/link';
import { QuizAlertModal } from './alert-model';
import FlashcardLoading from '../theory-flashcard/lesson-flashcard-loading';
import { EditQuizForm } from './edit-question-in-quiz';
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
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setIsLoading(!isLoading);
        const response = await getQuizByType(lessonId, 'lesson', token);
        setQuiz(response);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [lessonId]);
  if (isLoading) {
    return <FlashcardLoading />;
  }

  return (
    <div className="w-full">
      {!quiz ? (
        <div className="w-full">
          <Empty />
          <div className="flex w-full justify-center">
            <QuizAlertModal
              isOpen={open}
              onClose={() => setOpen(false)}
              lessonId={lessonId}
              params={params}
              token={token}
            />
            <Button onClick={() => setOpen(true)}>Create</Button>
            {/* <Link
              href={`/dashboard/subject/${params.subjectId}/chapter/${params.chapterId}/lesson/${lessonId}/quiz/create`}
            >
              <Button>Create</Button>
            </Link> */}
          </div>
        </div>
      ) : (
        <EditQuizForm
          initialData={quiz.questionInQuizzes}
          quizId={quiz.id}
          token={token}
        />
      )}
    </div>
  );
};
export default LessonQuiz;
