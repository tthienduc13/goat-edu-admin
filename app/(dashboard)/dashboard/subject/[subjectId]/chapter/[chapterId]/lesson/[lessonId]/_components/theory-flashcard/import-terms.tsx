import { useMemo, useState } from 'react';

import { Layers } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AutoResizeTextarea } from '@/components/ui/autorsize-textarea';
import useImportTermsStore from '@/stores/useImportTermStore';

interface ImportTermsProps {
  onImport: (flashcardContent: { question: string; answer: string }[]) => void;
}

export const ImportTerms = ({ onImport }: ImportTermsProps) => {
  const { isImportTermsOpen, setIsImportTermsOpen } = useImportTermsStore();
  const [value, setValue] = useState('');

  const [_termDelimiter, setTermDelimiter] = useState('\\t');
  const [_cardDelimiter, setCardDelimiter] = useState('\\n');
  const td = _termDelimiter.replace(/\\t/g, '\t').replace(/\\n/g, '\n');
  const cd = _cardDelimiter.replace(/\\t/g, '\t').replace(/\\n/g, '\n');

  const generatePlaceholder = () => {
    return Array.from({ length: 3 })
      .map((_, i) => `Question ${i + 1}${td}Answer ${i + 1}`)
      .join(cd);
  };

  const parseTerms = (
    value: string,
    td: string,
    cd: string
  ): { question: string; answer: string }[] => {
    return value
      .split(cd)
      .map((card) => card.split(td))
      .map(([question, answer]) => ({
        question: question || '',
        answer: answer || ''
      }))
      .filter(({ question, answer }) => question || answer);
  };

  const previewTerms = useMemo(
    () => parseTerms(value, td, cd),
    [value, td, cd]
  );

  return (
    <Dialog open={isImportTermsOpen} onOpenChange={setIsImportTermsOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: 'default' }),
            'cursor-pointer'
          )}
        >
          <Layers className="mr-2 h-4 w-4 -rotate-90" />
          <span>Import terms</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[1000px]">
        <DialogTitle className="text-xl">Import terms</DialogTitle>
        <div className="flex max-h-[600px] flex-col gap-y-8 overflow-y-scroll">
          <div className="flex flex-col gap-y-2">
            <div className="text-sm text-muted-foreground">
              Copy and paste your questions and answers in the following format:
            </div>
            <div className="px-1">
              <AutoResizeTextarea
                placeholder={generatePlaceholder()}
                allowTab
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row gap-y-8">
            <div className="flex w-full flex-col gap-y-2">
              <div className="flex flex-col gap-y-1">
                <div className="text-base font-bold">In between terms</div>
                <span className="text-sm text-muted-foreground">
                  Defaults to tab
                </span>
              </div>
              <Input
                className="shadow-none outline-none focus-visible:ring-0"
                placeholder="Tab"
                value={_termDelimiter}
                onChange={(e) => setTermDelimiter(e.target.value)}
              />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <div className="flex flex-col gap-y-1">
                <div className="text-base font-bold">In between cards</div>
                <span className="text-sm text-muted-foreground">
                  Defaults to newline
                </span>
              </div>
              <Input
                className=" shadow-none outline-none focus-visible:ring-0"
                placeholder="New line"
                value={_cardDelimiter}
                onChange={(e) => setCardDelimiter(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="text-base font-bold">Preview</div>
            <div className="flex flex-col gap-y-2">
              {previewTerms.map(({ question, answer }, index) => (
                <div
                  key={index}
                  className="rouded-lg flex flex-row divide-x-[1px] bg-secondary/40 py-4"
                >
                  <div className="w-[60%] px-4">{question}</div>
                  <div className="w-[40%] px-4">{answer}</div>
                </div>
              ))}
            </div>
            {previewTerms.length === 0 && (
              <div className="text-muted-foreground">Nothing to preview</div>
            )}
          </div>
        </div>
        <DialogFooter>
          <div className="flex flex-row gap-x-2">
            <Button
              variant={'secondary'}
              onClick={() => setIsImportTermsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={!previewTerms.length}
              onClick={() => {
                onImport(previewTerms);
                setIsImportTermsOpen(false);
              }}
            >
              Import
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
