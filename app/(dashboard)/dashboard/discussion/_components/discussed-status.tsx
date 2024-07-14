import { cn } from '@/lib/utils';
import { Status } from '@/types/discussion';
interface DiscussedStatusProps {
  status: string;
}
export const DiscussedStatus = ({ status }: DiscussedStatusProps) => {
  return (
    <div
      className={cn(
        'rounded-md px-3 py-2 text-sm font-semibold',
        status === Status.Approved && 'bg-emerald-500/15 text-emerald-500',
        status === Status.Vac && 'bg-destructive/15 text-destructive',
        status === Status.Unapproved && 'bg-yellow-500/15 text-yellow-500'
      )}
    >
      {status}
    </div>
  );
};
