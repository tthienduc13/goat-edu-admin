'use client';
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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ChapterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerDownLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import EditIconAnimate from '@/assets/gif/edit.gif';
import EditIconPause from '@/assets/gif/edit_pause.png';

import * as z from 'zod';
import { getChapterById } from '@/app/api/chapter/chapter.api';
import { Chapter } from '@/types/chapter';
import { Lesson } from '@/types/lesson';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Input } from '@/components/ui/input';
import { UpdateChapterAction } from '@/actions/chapter/update-chapter';
import { getLessonByChapter } from '@/app/api/lesson/lesson.api';
import { PaginationData } from '@/types/pagination';
import ChapterFormLoading from '../../../_components/chapter/chapter-form-loading';
import LessonList from '../../../_components/lesson/lesson-list';

interface ChapterDetailPageProps {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

const ChapterDetailPage = ({ params }: ChapterDetailPageProps) => {
  const { subjectId, chapterId } = params;
  const [chapterData, setChapterData] = useState<Chapter>();
  const [lessonList, setLessonList] = useState<Lesson[]>([]);
  const [lessonPagination, setLessonPagination] = useState<PaginationData>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();
  const handleGoBack = () => {
    router.back();
  };
  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    mode: 'onChange',
    defaultValues: {
      chapterLevel: 0,
      chapterName: ''
    }
  });

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        setIsLoading(true);
        const chapterResponse = await getChapterById(
          chapterId,
          session.data?.user?.token as string
        );
        setChapterData(chapterResponse);
        form.reset({
          chapterName: chapterResponse.chapterName,
          chapterLevel: chapterResponse.chapterLevel
        });

        const lessonResponse = await getLessonByChapter({
          chapterId: chapterId,
          token: session.data?.user?.token as string,
          sort: 'displayOrder',
          sortDirection: 'asc'
        });
        setLessonList(lessonResponse.data);
        setLessonPagination(
          JSON.parse(lessonResponse.headers['x-pagination']) as PaginationData
        );
      } catch (error) {
        console.log('Error fetching chapter data :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChapter();
  }, [chapterId, subjectId, session.data?.user?.token as string]);

  const onSubmit = async (values: z.infer<typeof ChapterSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const createResponse = await UpdateChapterAction(
          session.data?.user?.token as string,
          chapterId,
          values
        );
        if (createResponse === 200) {
          toast({
            description: `Chapter updated successfully !`
          });
        } else {
          toast({
            description: `Failed to update chapter`,
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
    <div className="max-h-screen space-y-4 overflow-y-auto p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      {isLoading ? (
        <ChapterFormLoading />
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <Heading
              title="Chapter information"
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-[132px] w-full"
            >
              <div className="mt-4 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="chapterName"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Chapter name</FormLabel>
                      <FormControl>
                        <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                          <div className="flex w-full flex-col">
                            <Input
                              disabled={isPending || !isEdit}
                              type="text"
                              placeholder="Enter chapter name"
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
                  name="chapterLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chapter level</FormLabel>
                      <FormControl>
                        <Input
                          className="h-[48px]"
                          type="number"
                          disabled={isPending || !isEdit}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 flex w-full justify-end">
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
            </form>
          </Form>
        </>
      )}

      <Separator />
      <LessonList
        TotalCount={lessonPagination?.TotalCount}
        chapterId={chapterId}
        subjectId={subjectId}
        isLoading={isLoading}
        lessonList={lessonList}
      />
    </div>
  );
};

export default ChapterDetailPage;
