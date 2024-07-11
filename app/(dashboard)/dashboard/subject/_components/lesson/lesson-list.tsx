import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { lessonColumns } from './lesson-columns';
import { Lesson } from '@/types/lesson';

interface LessonListProps {
  isLoading: boolean;
  lessonList: Lesson[];
  TotalCount: number | undefined;
  subjectId: string;
  chapterId: string;
}

const LessonList = ({
  isLoading,
  lessonList,
  TotalCount,
  subjectId,
  chapterId
}: LessonListProps) => {
  return (
    <div className="w-full space-y-4">
      {!isLoading && (
        <div className="flex w-full items-center justify-between">
          <Heading
            title={`Lessons of this chapter (${TotalCount})`}
            description="Manage Subject (Client side table functionalities.)"
          />
          <Link
            href={`/dashboard/subject/${subjectId}/chapter/${chapterId}/lesson/create`}
          >
            <Button size={'icon'} className="rounded-full">
              <Plus />
            </Button>
          </Link>
        </div>
      )}

      <DataTable
        columns={lessonColumns}
        data={lessonList}
        isLoading={isLoading}
        searchKey="lessonName"
      />
    </div>
  );
};
export default LessonList;
