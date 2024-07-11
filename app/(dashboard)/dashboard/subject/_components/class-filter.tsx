import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ClassFitlerProps {
  handleClassChange: (value: string) => void;
}

const ClassFitler = ({ handleClassChange }: ClassFitlerProps) => {
  return (
    <Select onValueChange={handleClassChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Classes" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Class 10">Class 10</SelectItem>
          <SelectItem value="Class 11">Class 11</SelectItem>
          <SelectItem value="Class 12">Class 12</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ClassFitler;
