'use client';

import { getAllDiscussion } from '@/app/api/discussion/discussion.api';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Discussion, Status } from '@/types/discussion';
import { PaginationData } from '@/types/pagination';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { discussionColumns } from './_components/discussion-columns';
import PaginationSection from '@/components/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import StatusFitler from './_components/status-filter';
import { Button } from '@/components/ui/button';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  ListRestart
} from 'lucide-react';

const DiscussionManagementPage = () => {
  const [inputValue, setInputValue] = useState<number>(1);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [sortDirection, setSortDirection] = useState<string>('desc');

  const [discussionData, setDiscussionData] = useState<Discussion[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [discussionStatus, setDiscussionStatus] = useState<Status>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const session = useSession();

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        setIsLoading(true);
        const discussionResponse = await getAllDiscussion({
          token: session.data?.user?.token as string,
          pageNumber: currentPageNum,
          pageSize: 10,
          status: discussionStatus ? discussionStatus : undefined,
          sort: 'createdAt',
          sortDirection: sortDirection ? sortDirection : undefined
        });
        setDiscussionData(discussionResponse.data);
        setPagination(
          JSON.parse(
            discussionResponse.headers['x-pagination']
          ) as PaginationData
        );
      } catch (error) {
        console.log('Fetching data error :', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscussion();
  }, [discussionStatus, currentPageNum, sortDirection]);
  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
    setIsEdit(false);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
      setIsEdit(false);
    }
  };
  const handlePageClick = () => {
    setIsEdit(true);
  };

  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value);
    if (num < 0) {
      num = -num;
    }

    if (num === 0) {
      num = 1;
    }

    if (num > pagination?.TotalPages!) {
      num = pagination?.TotalPages!;
    }
    setInputValue(num);
  };

  const enterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (discussionData !== null) {
      if (e.code === 'Enter' && inputValue <= pagination?.TotalPages!) {
        setCurrentPageNum(inputValue);
        setIsEdit(false);
      }
    }
  };

  const handleStatusChange = (value: Status) => {
    setDiscussionStatus(value);
    setCurrentPageNum(1);
  };

  const handleResest = () => {
    setCurrentPageNum(1);
    setDiscussionStatus(undefined);
  };

  const handleSortDirectionChange = (value: string) => {
    setSortDirection(value);
  };

  return (
    <div className="w-full space-y-4 p-8">
      <div className="flex w-full justify-between">
        {isLoading ? (
          <div className="flex h-14 flex-col justify-between">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        ) : (
          <Heading
            title={`Discussion (${pagination?.TotalCount})`}
            description="Manage Subject (Client side table functionalities.)"
          />
        )}
        {!isLoading && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span>Filter: </span>
              <StatusFitler handleStatusChange={handleStatusChange} />
            </div>
            <Button size={'icon'} onClick={handleResest}>
              {' '}
              <ListRestart />
            </Button>
            <div className="flex items-center space-x-2">
              <span>Sort: </span>
              {sortDirection === 'asc' ? (
                <Button
                  size={'icon'}
                  onClick={() => handleSortDirectionChange('desc')}
                >
                  <ArrowUpWideNarrow />
                </Button>
              ) : (
                <Button
                  size={'icon'}
                  onClick={() => handleSortDirectionChange('asc')}
                >
                  <ArrowDownWideNarrow />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <Separator />
      <DataTable
        columns={discussionColumns}
        data={discussionData}
        isLoading={isLoading}
        searchKey="discussionName"
      />
      {discussionData && (
        <div className="flex w-full justify-end">
          <div>
            <PaginationSection
              addInput={addInput}
              currentPageNum={currentPageNum}
              enterInput={enterInput}
              handleNextPage={handleNextPage}
              handlePageClick={handlePageClick}
              handlePreviousPage={handlePreviousPage}
              hasNextPage={pagination?.HasNextPage}
              hasPreviousPage={pagination?.HasPreviousPage}
              inputValue={inputValue}
              isEdit={isEdit}
              totalPages={pagination?.TotalPages}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionManagementPage;
