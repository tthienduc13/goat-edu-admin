'use client';

import { createTheory } from '@/app/api/theory/theory.api';
import Editor from '@/components/novel/novel-editor';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { CornerDownLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'sonner';

interface TheoryCreatePageProps {
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}

const TheoryCreatePage = ({ params }: TheoryCreatePageProps) => {
  const [isPending, startTransition] = useTransition();
  const [jsonContent, setJsonContent] = useState<string>('');
  const [HtmlContent, setHtmlContent] = useState<string>('');
  const session = useSession();
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  const handleSaveTheory = () => {
    startTransition(async () => {
      try {
        const response = await createTheory(
          session.data?.user?.token as string,
          jsonContent,
          HtmlContent,
          params.lessonId
        );
        if (response.status === 201) {
          toast.success('Created theory successfully !');
          router.back();
        } else {
          toast.error('Failed to create theory !');
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="w-full space-y-4 p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      <Heading
        title="Theory create section"
        description="Manage Subject (Client side table functionalities.)"
      />
      <Editor setHtmlContent={setHtmlContent} setJsonContent={setJsonContent} />
      <div className="flex w-full justify-end">
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
    </div>
  );
};
export default TheoryCreatePage;
