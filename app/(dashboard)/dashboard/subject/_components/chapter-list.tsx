import { Chapter } from '@/types/chapter';
import { LessonByChapter } from '@/types/lesson';
import { Subject } from '@/types/subject';

interface ChapterListProps {
  data: Chapter[] | undefined;
}

export const ChapterList = ({ data }: ChapterListProps) => {
  return (
    <div className="chapter-list mt-3">
      {data?.map((chapter) => (
        <div key={chapter.id}>
          Chap {chapter.chapterLevel} : {chapter.chapterName}
        </div>
      ))}
    </div>
  );
};
