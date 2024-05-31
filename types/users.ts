export type UserType = {
  userId: string;
  username: string;
  fullname: string;
  email: string;
  image: string;
  emailVerify: boolean;
  role: {
    id: string;
    roleName: string;
  };
  token: string;
};

export type UserList = {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  fullname: string;
  roleName: string;
  isConfirmEmail: boolean;
  isDeleted: boolean;
};

export type UserListInfor = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  nextPageNumber: number;
  previousPageNumber: number;
  items: UserList[];
};
