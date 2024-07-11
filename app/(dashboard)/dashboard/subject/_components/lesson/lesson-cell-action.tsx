'use client';
import { deleteLesson } from '@/app/api/lesson/lesson.api';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Lesson } from '@/types/lesson';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

interface CellActionProps {
  data: Lesson;
  subjectId: string;
}

export const LessonCellAction: React.FC<CellActionProps> = ({
  data,
  subjectId
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const session = useSession();
  const onConfirm = async (lessonId: string) => {
    setLoading(true);
    if (session.data !== null) {
      try {
        const response = await deleteLesson(
          lessonId,
          session.data.user?.token as string
        );
        return response;
      } catch (error) {
      } finally {
        setLoading(false);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
        id={data.id}
        name={data.lessonName}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem>
            <Link
              className="flex"
              href={`/dashboard/subject/${subjectId}/chapter/${data.chapterId}/lesson/${data.id}`}
              passHref
            >
              <Edit className="mr-2 h-4 w-4" /> Update
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
