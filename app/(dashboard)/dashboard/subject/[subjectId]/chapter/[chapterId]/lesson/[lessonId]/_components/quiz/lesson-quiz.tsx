'use client';
import * as z from 'zod';
import { getQuizByType } from '@/app/api/quiz/quiz.api';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { QuestionInQuizSchema } from '@/schemas';
import { Quiz } from '@/types/quiz';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { SubjectSchema } from '@/schemas';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FileImage, Loader2, PencilLine, Plus, TrashIcon } from 'lucide-react';
import { CreateQuestionQuiz } from '@/actions/create-question-in-quiz';
import { toast } from 'sonner';
import { KeyBoardShorcuts } from '@/app/(dashboard)/dashboard/_components/theory-flashcard/keyboard-shorcuts';
import { Skeleton } from '@/components/ui/skeleton';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
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
  const [isOpenImage, setIsOpenImage] = useState<boolean>();

  const form = useForm<z.infer<typeof QuestionInQuizSchema>>({
    resolver: zodResolver(QuestionInQuizSchema),
    mode: 'onChange',
    defaultValues: {
      quiz: [
        {
          quizQuestion: '',
          quizAnswer1: '',
          quizAnswer2: '',
          quizAnswer3: '',
          quizCorrect: ''
        },
        {
          quizQuestion: '',
          quizAnswer1: '',
          quizAnswer2: '',
          quizAnswer3: '',
          quizCorrect: ''
        },
        {
          quizQuestion: '',
          quizAnswer1: '',
          quizAnswer2: '',
          quizAnswer3: '',
          quizCorrect: ''
        }
      ]
    }
  });

  const handleOpenImage = () => {
    setIsOpenImage(!isOpenImage);
  };

  const handleInsertNew = () => {
    append({
      quizQuestion: '',
      quizAnswer1: '',
      quizAnswer2: '',
      quizAnswer3: '',
      quizCorrect: ''
    });
  };
  const onSubmit = (values: z.infer<typeof QuestionInQuizSchema>) => {
    startTransition(() => {
      CreateQuestionQuiz({ values: values, quizId: quiz?.id as string }).then(
        (data) => {
          if (data.success) {
            toast.success(data.success);
            // susscess thi lam gi???
            // router.replace(`/flashcards/${id}`);
          } else {
            toast.error(data.error);
          }
        }
      );
    });
  };
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: 'quiz'
  });
  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await getQuizByType(lessonId, 'lesson', token);
      setQuiz(response);
    };
    fetchQuiz();
  }, [lessonId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'r'
      ) {
        event.preventDefault();
        handleInsertNew();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="w-full space-y-4">
        <Heading
          title="Quiz information"
          description="Manage Subject (Client side table functionalities.)"
        />
        <Separator />
        {/* {quiz?.questionInQuizzes.map((question) => (
          <div
            key={question.id}
            className="mb-12 w-full rounded-xl border px-8 py-6 dark:bg-slate-900"
          >
            <div className="question mb-16 w-full">
              <p className="text-xl">{question.quizQuestion}</p>
            </div>
          </div>
        ))} */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex w-full flex-col gap-10"
          >
            <div className="left-0 flex w-full items-center justify-between rounded-lg border-[2px] px-5 py-4 shadow-lg">
              <div className="flex flex-col gap-y-1">
                <div className="flex w-full flex-row items-center gap-x-2">
                  <PencilLine className="h-4 w-4" />
                  <div className="text-xl font-semibold">Create a new set</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {fields.length} terms
                </div>
              </div>
              <Button
                disabled={
                  isPending || Object.keys(form.formState.errors).length > 0
                }
                className="w-fit"
                type="submit"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <div>Creating</div>
                  </>
                ) : (
                  <div>Create</div>
                )}
              </Button>
            </div>
            {/* Theory Infor */}

            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-x-2">
                <KeyBoardShorcuts />
              </div>
            </div>
            <div className="w-full space-y-3 ">
              <Sortable
                value={fields}
                onMove={({ activeIndex, overIndex }) =>
                  move(activeIndex, overIndex)
                }
                overlay={
                  <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                    <Skeleton className="h-8 w-full rounded-sm" />
                    <Skeleton className="h-8 w-full rounded-sm" />
                    <Skeleton className="size-8 shrink-0 rounded-sm" />
                    <Skeleton className="size-8 shrink-0 rounded-sm" />
                  </div>
                }
              >
                <div className="w-full space-y-3">
                  {fields.map((field, index) => (
                    <SortableItem key={field.id} value={field.id} asChild>
                      <div className="flex w-full flex-col rounded-xl bg-[#a8b3cf14]">
                        <div className="flex w-full flex-row items-center justify-between  border-b-[2px] p-4">
                          <div className="flex-1 text-lg font-semibold text-muted-foreground">
                            {index + 1}
                          </div>
                          <div className="flex w-full items-center justify-end gap-x-2">
                            <SortableDragHandle
                              variant="ghost"
                              size="icon"
                              className="size-8 shrink-0"
                            >
                              <DragHandleDots2Icon
                                className="size-5"
                                aria-hidden="true"
                              />
                            </SortableDragHandle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="size-8 shrink-0"
                              onClick={() => remove(index)}
                            >
                              <TrashIcon
                                className="size-5 "
                                aria-hidden="true"
                              />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex w-full flex-row flex-wrap gap-x-8 p-4">
                          <FormField
                            control={form.control}
                            name={`quiz.${index}.quizQuestion`}
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter question"
                                    className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                                <div className=" border-[1px] border-primary"></div>
                                <div className="text-xs font-semibold text-muted-foreground">
                                  QUIZ QUESTION
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`quiz.${index}.quizAnswer1`}
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    placeholder="Enter answer"
                                    className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                                <div className=" border-[1px] border-primary"></div>
                                <div className="text-xs font-semibold text-muted-foreground">
                                  QUIZ ANSWER 1
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`quiz.${index}.quizAnswer2`}
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    placeholder="Enter answer"
                                    className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                                <div className=" border-[1px] border-primary"></div>
                                <div className="text-xs font-semibold text-muted-foreground">
                                  QUIZ ANSWER 2
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`quiz.${index}.quizAnswer3`}
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    placeholder="Enter answer"
                                    className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                                <div className=" border-[1px] border-primary"></div>
                                <div className="text-xs font-semibold text-muted-foreground">
                                  QUIZ ANSWER 3
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`quiz.${index}.quizCorrect`}
                            render={({ field }) => (
                              <FormItem className="flex w-full flex-col">
                                <FormControl>
                                  <Input
                                    placeholder="Enter answer"
                                    className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                    {...field}
                                  />
                                </FormControl>
                                <div className=" border-[1px] border-primary"></div>
                                <div className="text-xs font-semibold text-muted-foreground">
                                  QUIZ CORRECT ANSWER
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <button
                            onClick={handleOpenImage}
                            className="flex max-h-[74px] flex-col items-center justify-center gap-y-1 rounded-lg border-[2px] border-dashed px-6 py-3"
                          >
                            <FileImage className="h-4 w-4" />
                            <div className="text-xs font-semibold text-muted-foreground">
                              IMAGE
                            </div>
                          </button>
                        </div>
                      </div>
                    </SortableItem>
                  ))}
                </div>
              </Sortable>
              <div className="flex h-[100px] w-full items-center justify-center rounded-lg bg-[#a8b3cf14]">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="w-fit rounded-none border-b-[4px] p-0 text-lg text-muted-foreground hover:bg-none"
                  onClick={handleInsertNew}
                >
                  <Plus className="mr-2 h-5 w-5 font-semibold" />
                  ADD QUIZ
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default LessonQuiz;
