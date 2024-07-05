import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const UpdateFormLoading = () => {
  return (
    <div className="w-full space-y-4 p-4">
      <div className="flex h-14 flex-col justify-between">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
      <Separator />
      <div className="flex w-full justify-evenly">
        <div className="w-[600px] flex-col space-y-4">
          <div className="w-full">
            <Skeleton className="h-[16.8px] w-full" />
            <Skeleton className="mt-2 h-[48px] w-full" />
          </div>
          <div className="w-full">
            <Skeleton className="h-[16.8px] w-full" />
            <Skeleton className="mt-2 h-[48px] w-full" />
          </div>
          <div className="w-full">
            <Skeleton className="h-[16.8px] w-full" />
            <Skeleton className="mt-2 h-[48px] w-full" />
          </div>
          <div className="w-full">
            <Skeleton className="h-[16.8px] w-full" />
            <Skeleton className="mt-2 h-[48px] w-full" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-[384px]" />
          <Skeleton className="h-[216px] w-[384px]" />
        </div>
      </div>
    </div>
  );
};
export default UpdateFormLoading;
