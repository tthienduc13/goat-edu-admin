import { Skeleton } from '@/components/ui/skeleton';

const LessonFormLoading = () => {
  return (
    <div className="mt-9 flex flex-col space-y-4">
      <div className="flex h-[52px] flex-col">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[250px]" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-[20px] w-[95px]" />
          <Skeleton className="mt-2 h-[48px] w-[606.67px]" />
        </div>
        <div>
          <Skeleton className="h-[20px] w-[95px]" />
          <Skeleton className="mt-2 h-[48px] w-[606.67px]" />
        </div>
      </div>

      <div className="w-full">
        <Skeleton className="h-[20px] w-[95px]" />
        <Skeleton className="mt-2 h-[52px] w-full" />
      </div>
    </div>
  );
};
export default LessonFormLoading;
