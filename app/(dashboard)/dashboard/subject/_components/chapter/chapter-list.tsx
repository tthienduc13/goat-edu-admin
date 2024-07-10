import { Chapter } from '@/types/chapter';
import { Heading } from '@/components/ui/heading';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { chapterColumns } from '../../_components/chapter/chapter-columns';
import Empty from '../../_components/empty-state';

interface ChapterListProps {
  subjectId: string | undefined;
  data: Chapter[] | undefined;
  numOfChapters: number | undefined;
  isLoading: boolean;
}

const ChapterList = ({
  subjectId,
  data,
  numOfChapters,
  isLoading
}: ChapterListProps) => {
  return (
    <div className="chapter-list mt-3 w-full pb-[80px]">
      <div className="flex w-full items-center justify-between">
        <Heading
          title={`Chapters(${numOfChapters})`}
          description="Subject's chapters"
        />
        <Link href={`/dashboard/subject/${subjectId}/chapter/create`}>
          <Button size={'icon'} className="rounded-full">
            <Plus />
          </Button>
        </Link>
      </div>

      {numOfChapters === 0 ? (
        <Empty />
      ) : (
        <div className="flex w-full justify-center">
          <div className="w-[750px]">
            <DataTable
              isLoading={isLoading}
              searchKey="chapterName"
              columns={chapterColumns}
              data={data!}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterList;
