import { Skeleton } from '@/components/ui/skeleton';

const ChapterFormLoading = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[250px]" />
      </div>

      <div className="mt-4 grid h-[132px] grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-[20px] w-[95px]" />
          <Skeleton className="mt-2 h-[48px] w-[606.67px]" />
        </div>
        <div>
          <Skeleton className="h-[20px] w-[95px]" />
          <Skeleton className="mt-2 h-[48px] w-[606.67px]" />
        </div>
      </div>
    </div>
  );
};
export default ChapterFormLoading;
