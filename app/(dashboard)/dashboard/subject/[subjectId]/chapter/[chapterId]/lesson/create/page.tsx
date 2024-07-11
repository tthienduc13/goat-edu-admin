'use client';
import { Button } from '@/components/ui/button';
import { CornerDownLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LessonCreatePageProps {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

const LessonCreatePage = ({ params }: LessonCreatePageProps) => {
  const { subjectId, chapterId } = params;
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className="flex w-full flex-col p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      subject Id : {subjectId}, chapter Id : {chapterId}
    </div>
  );
};
export default LessonCreatePage;
