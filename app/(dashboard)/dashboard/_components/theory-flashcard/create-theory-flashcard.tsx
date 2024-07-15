'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { DragHandleDots2Icon, TrashIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';

import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import {
  Sortable,
  SortableDragHandle,
  SortableItem
} from '@/components/ui/sortable';

import { FileImage, Loader2, PencilLine, Plus } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ImportTerms } from './import-terms';
import { KeyBoardShorcuts } from './keyboard-shorcuts';
import { TheoryFlashcardSchema } from '@/schemas';
import { CreateTheoryFlashcard } from '@/actions/create-theory-flashcard';

export const CreateFlashcardContentForm = () => {
  const theoryId = 'id o day';

  const [isPending, startTransition] = useTransition();
  const [isOpenImage, setIsOpenImage] = useState<boolean>();

  const form = useForm<z.infer<typeof TheoryFlashcardSchema>>({
    resolver: zodResolver(TheoryFlashcardSchema),
    mode: 'onChange',
    defaultValues: {
      flashcardContent: [
        {
          question: '',
          answer: ''
        },
        {
          question: '',
          answer: ''
        },
        {
          question: '',
          answer: ''
        }
      ]
    }
  });

  const handleOpenImage = () => {
    setIsOpenImage(!isOpenImage);
  };

  const handleInsertNew = () => {
    append({
      question: '',
      answer: ''
    });
  };

  const onSubmit = (values: z.infer<typeof TheoryFlashcardSchema>) => {
    startTransition(() => {
      CreateTheoryFlashcard({ values: values, theoryId: theoryId }).then(
        (data) => {
          if (data.success) {
            toast.success(data.success);
            // susscess thi lam gi???
            // router.replace(`/flashcards/${id}`);
          } else {
            toast.error(data.error);
          }
        }
      );
    });
  };

  const { fields, append, move, remove, prepend } = useFieldArray({
    control: form.control,
    name: 'flashcardContent'
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === 'r'
      ) {
        event.preventDefault();
        handleInsertNew();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImport = (
    flashcardContent: { question: string; answer: string }[]
  ) => {
    prepend(
      flashcardContent.map((content) => ({
        question: content.question,
        answer: content.answer
      }))
    );
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative flex w-full flex-col gap-10"
        >
          <div className="left-0 flex w-full items-center justify-between rounded-lg border-[2px] px-5 py-4 shadow-lg">
            <div className="flex flex-col gap-y-1">
              <div className="flex w-full flex-row items-center gap-x-2">
                <PencilLine className="h-4 w-4" />
                <div className="text-xl font-semibold">Create a new set</div>
              </div>
              <div className="text-sm text-muted-foreground">
                {fields.length} terms
              </div>
            </div>
            <Button
              disabled={
                isPending || Object.keys(form.formState.errors).length > 0
              }
              className="w-fit"
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <div>Creating</div>
                </>
              ) : (
                <div>Create</div>
              )}
            </Button>
          </div>
          {/* Theory Infor */}
          <div className="flex flex-col gap-y-4">
            <div className="flex w-full flex-col gap-y-5">
              <div className="flex flex-row items-center overflow-hidden rounded-xl px-4">
                <div className="flex w-full cursor-none flex-col text-5xl font-bold">
                  {/* {theoryName} */}
                </div>
              </div>
              <div className="flex w-full flex-row gap-x-5">
                <div className="flex  h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                  <div className="flex w-full cursor-none flex-col text-base text-muted-foreground">
                    {/* {theoryDescription} */}
                  </div>
                </div>
                <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                  <div className="flex w-full cursor-none flex-col text-muted-foreground">
                    {/* {flashcardData?.subjectName} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <ImportTerms onImport={handleImport} />
            <div className="flex flex-row items-center gap-x-2">
              <KeyBoardShorcuts />
            </div>
          </div>
          <div className="w-full space-y-3 ">
            <Sortable
              value={fields}
              onMove={({ activeIndex, overIndex }) =>
                move(activeIndex, overIndex)
              }
              overlay={
                <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="h-8 w-full rounded-sm" />
                  <Skeleton className="size-8 shrink-0 rounded-sm" />
                  <Skeleton className="size-8 shrink-0 rounded-sm" />
                </div>
              }
            >
              <div className="w-full space-y-3">
                {fields.map((field, index) => (
                  <SortableItem key={field.id} value={field.id} asChild>
                    <div className="flex w-full flex-col rounded-xl bg-[#a8b3cf14]">
                      <div className="flex w-full flex-row items-center justify-between  border-b-[2px] p-4">
                        <div className="flex-1 text-lg font-semibold text-muted-foreground">
                          {index + 1}
                        </div>
                        <div className="flex w-full items-center justify-end gap-x-2">
                          <SortableDragHandle
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                          >
                            <DragHandleDots2Icon
                              className="size-5"
                              aria-hidden="true"
                            />
                          </SortableDragHandle>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="size-8 shrink-0"
                            onClick={() => remove(index)}
                          >
                            <TrashIcon className="size-5 " aria-hidden="true" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex w-full flex-row gap-x-8 p-4">
                        <FormField
                          control={form.control}
                          name={`flashcardContent.${index}.question`}
                          render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Enter question"
                                  className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <div className=" border-[1px] border-primary"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD QUESTION
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`flashcardContent.${index}.answer`}
                          render={({ field }) => (
                            <FormItem className="flex w-full flex-col">
                              <FormControl>
                                <Input
                                  placeholder="Enter answer"
                                  className="h-10 border-none text-lg shadow-none outline-none focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <div className=" border-[1px] border-primary"></div>
                              <div className="text-xs font-semibold text-muted-foreground">
                                FLASHCARD ANSWER
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <button
                          onClick={handleOpenImage}
                          className="flex max-h-[74px] flex-col items-center justify-center gap-y-1 rounded-lg border-[2px] border-dashed px-6 py-3"
                        >
                          <FileImage className="h-4 w-4" />
                          <div className="text-xs font-semibold text-muted-foreground">
                            IMAGE
                          </div>
                        </button>
                      </div>
                    </div>
                  </SortableItem>
                ))}
              </div>
            </Sortable>
            <div className="flex h-[100px] w-full items-center justify-center rounded-lg bg-[#a8b3cf14]">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-fit rounded-none border-b-[4px] p-0 text-lg text-muted-foreground hover:bg-none"
                onClick={handleInsertNew}
              >
                <Plus className="mr-2 h-5 w-5 font-semibold" />
                ADD CARD
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
