'use client';

import { getSubject } from '@/app/api/subject/subject.api';
import BreadCrumb from '@/components/breadcrumb';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PaginationData } from '@/types/pagination';
import { Subject } from '@/types/subject';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { columns } from './_components/columns';
import { Skeleton } from '@/components/ui/skeleton';

const breadcrumbItems = [{ title: 'Subject', link: '/dashboard/subject' }];

const SubjectManagementPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectData, setSubjectData] = useState<Subject[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationData>();
  const session = useSession();

  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };
  const handlePageClick = () => {
    setIsEdit(true);
  };
  useEffect(() => {
    const fetchSubject = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          const response = await getSubject(
            session.data.user?.token as string,
            10,
            currentPageNum
          );
          setSubjectData(response.data);
          setPagination(
            JSON.parse(response.headers['x-pagination']) as PaginationData
          );
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSubject();
  }, [currentPageNum, session.data]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        {isLoading ? (
          <div className="flex h-14 flex-col justify-between">
            <Skeleton className="h-8 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        ) : (
          <Heading
            title={`Subject (${pagination?.TotalCount})`}
            description="Manage Subject (Client side table functionalities.)"
          />
        )}

        <Separator />
        <DataTable
          isLoading={isLoading}
          searchKey="subjectName"
          columns={columns}
          data={subjectData}
        />
      </div>
    </ScrollArea>
  );
};

export default SubjectManagementPage;
