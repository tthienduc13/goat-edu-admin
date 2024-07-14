import { type ClassValue, clsx } from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeAgo = (date: Date): string => {
  const parsedDate = new Date(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true });
};
