export type PaginationData = {
  TotalCount: number;
  PageSize: number;
  CurrentPage: number;
  TotalPages: number;
  HasNextPage: boolean;
  HasPreviousPage: boolean;
  NextPageUrl: string;
  PreviousPageUrl: string;
};
