'use client';
import React, { useEffect, useState, useTransition } from 'react';
import 'katex/dist/katex.min.css';
import Empty from '@/app/(dashboard)/dashboard/subject/_components/empty-state';
import { Theory } from '@/types/theory';
import { getTheoryByLesson, updateTheory } from '@/app/api/theory/theory.api';
import Editor from '@/components/novel/novel-editor';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Link from 'next/link';

interface LessonTheoryProps {
  lessonId: string;
  lessonName: string;
  token: string;
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}

const LessonTheory = ({
  lessonId,
  lessonName,
  token,
  params
}: LessonTheoryProps) => {
  const [theoryData, setTheoryData] = useState<Theory>();
  const [theoryLoading, setTheoryLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [jsonContent, setJsonContent] = useState<string>('');
  const [HtmlContent, setHtmlContent] = useState<string>('');

  const handleSaveTheory = () => {
    startTransition(async () => {
      try {
        const response = await updateTheory(
          theoryData?.id as string,
          token,
          jsonContent,
          HtmlContent
        );
        if (response.status === 200) {
          toast.success('Updated theory successfully !');
        } else {
          toast.error('Failed to update theory !');
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const fetchTheory = async () => {
      try {
        setTheoryLoading(!theoryLoading);
        const response = await getTheoryByLesson({ lessonId, token });
        console.log(response.id);
        setTheoryData(response);
        setJsonContent(response.theoryContent);
        setHtmlContent(response.file);
      } catch (error) {
      } finally {
        setTheoryLoading(false);
      }
    };
    fetchTheory();
  }, [lessonId]);

  if (!theoryData) {
    return (
      <div className="w-full">
        <div className="flex w-full justify-center">
          <Link
            href={`/dashboard/subject/${params.subjectId}/chapter/${params.chapterId}/lesson/${lessonId}/theory/create`}
          >
            <Button>Create</Button>
          </Link>
        </div>
        <Empty />
      </div>
    );
  }
  return (
    <div className="w-full space-y-8">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-semibold">Theory</h1>
        <Button disabled={isPending} onClick={handleSaveTheory}>
          {isPending ? (
            <>
              <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save'
          )}
        </Button>
      </div>

      <Editor
        setJsonContent={setJsonContent}
        setHtmlContent={setHtmlContent}
        initialData={theoryData.theoryContent}
      />
    </div>
  );
};

export default LessonTheory;
