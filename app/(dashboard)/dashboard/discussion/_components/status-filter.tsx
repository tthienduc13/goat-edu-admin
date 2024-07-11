import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Status } from '@/types/discussion';

interface ClassFitlerProps {
  handleStatusChange: (value: Status) => void;
}

const StatusFitler = ({ handleStatusChange }: ClassFitlerProps) => {
  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status :" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={Status.Approved}>{Status.Approved}</SelectItem>
          <SelectItem value={Status.Unapproved}>{Status.Unapproved}</SelectItem>
          <SelectItem value={Status.Vac}>{Status.Vac}</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default StatusFitler;
