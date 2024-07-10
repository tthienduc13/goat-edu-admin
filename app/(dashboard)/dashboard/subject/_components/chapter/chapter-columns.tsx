'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Chapter } from '@/types/chapter';
import { ChapterCellAction } from './chapter-cell-action';

export const chapterColumns: ColumnDef<Chapter>[] = [
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
    id: 'chapterName',
    header: 'Name',
    cell: ({ row }) => (
      <span>
        Chap {row.original.chapterLevel} : {row.original.chapterName}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <ChapterCellAction data={row.original} />
  }
];
