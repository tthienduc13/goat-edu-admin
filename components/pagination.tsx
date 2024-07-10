import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink
} from '@/components/ui/pagination';

interface UserPaginationProps {
  hasPreviousPage: boolean | undefined;
  isEdit: boolean;
  handlePreviousPage: () => void;
  enterInput: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  addInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentPageNum: number;
  handleNextPage: () => void;
  hasNextPage: boolean | undefined;
  totalPages: number | undefined;
  inputValue: number;
  handlePageClick: () => void;
}

const PaginationSection = ({
  handlePageClick,
  inputValue,
  hasPreviousPage,
  isEdit,
  handlePreviousPage,
  enterInput,
  addInput,
  currentPageNum,
  handleNextPage,
  hasNextPage,
  totalPages
}: UserPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage()}
            disabled={!hasPreviousPage}
          >
            Previous
          </Button>
        </PaginationItem>
        <PaginationItem>
          {isEdit ? (
            <div className="flex justify-end">
              <Input
                value={inputValue}
                onKeyDown={(e) => enterInput(e)}
                onChange={(e) => addInput(e)}
                className="w-[70px]"
                type="number"
              />
            </div>
          ) : (
            <PaginationLink onClick={handlePageClick}>
              {currentPageNum}/{totalPages}
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PaginationSection;
