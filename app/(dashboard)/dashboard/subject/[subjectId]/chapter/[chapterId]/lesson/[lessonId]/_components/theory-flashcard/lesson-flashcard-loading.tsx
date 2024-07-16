import { Skeleton } from '@/components/ui/skeleton';

const FlashcardLoading = () => {
  return (
    <div className="w-full">
      <Skeleton className="h-9 w-full" />
      <Skeleton className="mt-5 h-[444px] w-full" />
      <Skeleton className="mt-5 h-[40px] w-full" />
    </div>
  );
};

export default FlashcardLoading;
