'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { UserList, UserListInfor } from '@/types/users';
import { getUser } from '@/app/api/user/user.api';

export const UserClient = () => {
  const router = useRouter();
  // Array of users
  const [userList, setUserList] = useState<UserList[]>([]);

  // Information of response which included an array of users
  const [userListInfor, setUserListInfor] = useState<UserListInfor>();
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const handleNextPage = () => {
    setCurrentPageNum(currentPageNum + 1);
  };

  const handlePreviousPage = () => {
    if (currentPageNum > 1) {
      setCurrentPageNum(currentPageNum - 1);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser(10, currentPageNum);
        setUserListInfor(response);
        setUserList(response.items);
        // console.log(userList);
      } catch (error) {}
    };

    fetchData();
  }, [currentPageNum]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${userListInfor?.totalCount})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage()}
            disabled={!userListInfor?.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={!userListInfor?.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
      <DataTable searchKey="username" columns={columns} data={userList} />
    </>
  );
};
