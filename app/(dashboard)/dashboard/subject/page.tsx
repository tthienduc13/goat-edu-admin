'use client';

import { getSubject, getSubjectByClass } from '@/app/api/subject/subject.api';
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
import PaginationSection from '@/components/pagination';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const breadcrumbItems = [{ title: 'Subject', link: '/dashboard/subject' }];

const SubjectManagementPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subjectData, setSubjectData] = useState<Subject[]>([]);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationData>();
  const [className, setClassName] = useState<string>('All');
  const session = useSession();
  useEffect(() => {
    const fetchSubject = async () => {
      if (session.data !== null) {
        try {
          setIsLoading(true);
          if (className !== 'All') {
            const response = await getSubjectByClass(
              session.data.user?.token as string,
              className,
              10,
              currentPageNum
            );

            setSubjectData(response.data);
            setPagination(
              JSON.parse(response.headers['x-pagination']) as PaginationData
            );
          } else {
            const response = await getSubject(
              session.data.user?.token as string,
              10,
              currentPageNum
            );
            setSubjectData(response.data);
            setPagination(
              JSON.parse(response.headers['x-pagination']) as PaginationData
            );
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSubject();
  }, [currentPageNum, className]);
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

  const handleClassChange = (value: string) => {
    setClassName(value);
    setCurrentPageNum(1);
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
    if (subjectData !== null) {
      if (e.code === 'Enter' && inputValue <= pagination?.TotalPages!) {
        setCurrentPageNum(inputValue);
        setIsEdit(false);
      }
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <BreadCrumb items={breadcrumbItems} />
        <div className="flex w-full justify-between">
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
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <span>Sort:</span>
              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Link href={`/dashboard/subject/create`}>
              <Button size={'icon'} className="rounded-full">
                <Plus />
              </Button>
            </Link>
          </div>
        </div>

        <Separator />
        <DataTable
          isLoading={isLoading}
          searchKey="subjectName"
          columns={columns}
          data={subjectData}
        />
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
    </ScrollArea>
  );
};

export default SubjectManagementPage;
