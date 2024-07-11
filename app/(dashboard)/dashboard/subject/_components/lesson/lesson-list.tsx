import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { lessonColumns } from './lesson-columns';
import { Lesson } from '@/types/lesson';
import Empty from '../empty-state';

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
  const columns = lessonColumns({ subjectId });
  return (
    <div className="w-full space-y-4">
      {!isLoading && (
        <div className="flex w-full items-center justify-between">
          <Heading
            title={`Lessons of this chapter (${TotalCount ? TotalCount : 0})`}
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

      {isLoading ? (
        <></>
      ) : lessonList.length !== 0 ? (
        <DataTable
          columns={columns}
          data={lessonList}
          isLoading={isLoading}
          searchKey="lessonName"
        />
      ) : (
        <Empty />
      )}
    </div>
  );
};
export default LessonList;
