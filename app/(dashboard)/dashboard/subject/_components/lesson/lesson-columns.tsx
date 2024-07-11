'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Lesson } from '@/types/lesson';
import { LessonCellAction } from './lesson-cell-action';

interface lessonColumnsProps {
  subjectId: string;
}

export const lessonColumns = ({
  subjectId
}: lessonColumnsProps): ColumnDef<Lesson>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'lessonName',
    header: 'Name'
  },
  {
    accessorKey: 'displayOrder',
    header: 'Order'
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <LessonCellAction subjectId={subjectId} data={row.original} />
    )
  }
];
