import { Command } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Shorcuts = [
  { title: 'Add card', shortcuts: ['Command', 'Shift', 'R'] },
  { title: 'Next side or card', shortcuts: ['Tab'] }
];

export const KeyBoardShorcuts = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className={cn(buttonVariants({ size: 'icon' }))}>
          <Command className="h-4 w-4" />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[500px]">
        <DialogTitle className="text-xl">Keyboard shortcuts</DialogTitle>
        <div className="flex w-full flex-col divide-y-[2px]">
          {Shorcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between py-4"
            >
              <span className="text-base font-medium">{shortcut.title}</span>
              <div className="flex flex-row gap-x-1">
                {shortcut.shortcuts.map((key, keyIndex) => (
                  <Badge key={keyIndex} variant={'secondary'}>
                    {key === 'Command' ? <Command className="h-3 w-3" /> : key}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
