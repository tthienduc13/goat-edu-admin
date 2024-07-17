'use client';
import * as z from 'zod';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CornerDownLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import EditIconAnimate from '@/assets/gif/edit.gif';
import EditIconPause from '@/assets/gif/edit_pause.png';
import { Lesson } from '@/types/lesson';
import { getLessonById } from '@/app/api/lesson/lesson.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LessonSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { UpdateLessonAction } from '@/actions/lesson/update-lesson';
import { useToast } from '@/components/ui/use-toast';
import LessonFormLoading from '@/app/(dashboard)/dashboard/subject/_components/lesson/lesson-form-loading';
import { Separator } from '@/components/ui/separator';
import LessonTheory from './_components/theory/lesson-theory';
import LessonFlashCard from './_components/theory-flashcard/lesson-flashcard';
import LessonQuiz from './_components/quiz/lesson-quiz';
interface LessonDetailPageProps {
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}

const LessonDetailPage = ({ params }: LessonDetailPageProps) => {
  const source = {
    theory: 'Theory',
    theoryFlashcard: 'TheoryFlashCard',
    quiz: 'Quiz'
  };

  const { subjectId, chapterId, lessonId } = params;

  const [display, setDisplay] = useState<string>('Theory');

  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [lessonData, setLessonData] = useState<Lesson>();

  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  const handleGoBack = () => {
    router.back();
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };
  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema),
    mode: 'onChange',
    defaultValues: {
      displayOrder: 0,
      lessonBody: '',
      lessonName: ''
    }
  });
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setIsLoading(true);
        const lessonResponse = await getLessonById(
          lessonId,
          session.data?.user?.token as string
        );
        setLessonData(lessonResponse);
        form.reset({
          displayOrder: lessonResponse.displayOrder,
          lessonBody: lessonResponse.lessonBody,
          lessonName: lessonResponse.lessonName
        });
      } catch (error) {
        console.log('Error to fetch lesson :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLesson();
  }, [subjectId, chapterId, lessonId]);

  const hanldeOnClick = (value: string) => {
    setDisplay(value);
  };

  const onSubmit = async (values: z.infer<typeof LessonSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const updateResponse = await UpdateLessonAction(
          session.data?.user?.token as string,
          lessonId,
          values
        );
        if (updateResponse === 200) {
          toast({
            description: `Lesson updated successfully !`
          });
        } else {
          toast({
            description: `Failed to update Lesson`,
            variant: 'destructive'
          });
        }
      } catch (error: any) {
        toast({
          description: `An error occurred: ${error.message}`,
          variant: 'destructive'
        });
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <div className="max-h-screen w-full space-y-4 overflow-y-auto p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      {isLoading ? (
        <LessonFormLoading />
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <Heading
              title="Update lesson form."
              description="Manage Subject (Client side table functionalities.)"
            />
            <button
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[50%] transition hover:scale-125 hover:border-[1px] hover:border-blue-700"
              onClick={handleEditClick}
            >
              <Image
                src={isEdit ? EditIconAnimate : EditIconPause}
                alt="Edit"
                width={18}
                height={18}
              />
            </button>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <div className="flex w-full flex-col space-y-4">
                <div className="mt-4 grid w-full grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="lessonName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Lesson name</FormLabel>
                        <FormControl>
                          <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                            <div className="flex w-full flex-col">
                              <Input
                                disabled={isPending || !isEdit}
                                type="text"
                                placeholder="Enter lesson name"
                                className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                                {...field}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="displayOrder"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Display order</FormLabel>
                        <FormControl>
                          <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                            <div className="flex w-full flex-col">
                              <Input
                                disabled={isPending || !isEdit}
                                type="number"
                                placeholder="Enter display order."
                                className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                                {...field}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="lessonBody"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Lesson description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isPending || !isEdit}
                            placeholder="Enter lesson description"
                            className="resize-none border-0 bg-[#a8b3cf14]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-4 flex h-9 w-full justify-end">
                  {isEdit &&
                    (isPending ? (
                      <>
                        <Button disabled={isPending}>
                          <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                          Updating
                        </Button>
                      </>
                    ) : (
                      <Button type="submit">Update</Button>
                    ))}
                </div>
              </div>
            </form>
          </Form>
        </>
      )}
      <Separator />
      <Heading
        title="Lesson resource."
        description="Manage Subject (Client side table functionalities.)"
      />
      <Tabs defaultValue="Theory">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            onClick={() => hanldeOnClick(source.theory)}
            value={source.theory}
          >
            Theory
          </TabsTrigger>
          <TabsTrigger
            onClick={() => hanldeOnClick(source.theoryFlashcard)}
            value={source.theoryFlashcard}
          >
            FlashCard
          </TabsTrigger>
          <TabsTrigger
            onClick={() => hanldeOnClick(source.quiz)}
            value={source.quiz}
          >
            Quiz
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {lessonData &&
        (display === source.theory ? (
          <LessonTheory
            lessonId={lessonId}
            lessonName={lessonData.lessonName}
            token={session.data?.user?.token as string}
            params={params}
          />
        ) : display === source.theoryFlashcard ? (
          <LessonFlashCard
            lessonId={lessonId}
            lessonName={lessonData.lessonName}
            token={session.data?.user?.token as string}
            params={params}
          />
        ) : display === source.quiz ? (
          <LessonQuiz
            lessonId={lessonId}
            lessonName={lessonData.lessonName}
            token={session.data?.user?.token as string}
            params={params}
          />
        ) : (
          <></>
        ))}
    </div>
  );
};
export default LessonDetailPage;
