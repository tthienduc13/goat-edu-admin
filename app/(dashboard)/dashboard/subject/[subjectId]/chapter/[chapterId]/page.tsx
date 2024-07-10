'use client';
import { useEffect } from 'react';

interface ChapterDetailPageProps {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

const ChapterDetailPage = ({ params }: ChapterDetailPageProps) => {
  const { subjectId, chapterId } = params;
  useEffect(() => {
    const fetchChapter = () => {};
    fetchChapter();
  });

  return (
    <div>
      chapter id: {chapterId}, subject id: {subjectId}
    </div>
  );
};

export default ChapterDetailPage;
