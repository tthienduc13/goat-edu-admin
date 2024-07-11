'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

import { Discussion } from '@/types/discussion';
import { DiscussionCellAction } from './discussion-cell-action';

import { format } from 'date-fns';

export const discussionColumns: ColumnDef<Discussion>[] = [
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
    accessorKey: 'discussionName',
    header: 'Name'
  },
  {
    accessorKey: 'discussionVote',
    header: 'Votes'
  },
  {
    accessorKey: 'commentCount',
    header: 'Comments'
  },
  {
    id: 'createdAt',
    header: 'Created date',
    cell: ({ row }) => (
      <span>{format(new Date(row.original.createdAt), 'dd/MM/yyyy')}</span>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    id: 'actions',
    cell: ({ row }) => <DiscussionCellAction data={row.original} />
  }
];
