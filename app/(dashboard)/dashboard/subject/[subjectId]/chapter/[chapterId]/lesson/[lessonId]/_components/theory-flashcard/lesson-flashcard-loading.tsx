import { Skeleton } from '@/components/ui/skeleton';

const FlashcardLoading = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-9 w-[800px]" />
      <Skeleton className="mt-5 h-[444px] w-[800px]" />
      <Skeleton className="mt-5 h-[40px] w-[800px]" />
    </div>
  );
};

export default FlashcardLoading;
