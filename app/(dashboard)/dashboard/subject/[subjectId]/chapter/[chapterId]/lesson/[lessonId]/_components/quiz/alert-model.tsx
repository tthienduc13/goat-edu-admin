'use client';
import * as z from 'zod';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { QuizSchema } from '@/schemas/quiz';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CreateQuizAction } from '@/actions/quiz/create-quiz';

interface QuizAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessonId: string;
  token: string;
  params: {
    subjectId: string;
    chapterId: string;
    lessonId: string;
  };
}

export const QuizAlertModal: React.FC<QuizAlertModalProps> = ({
  isOpen,
  onClose,
  lessonId,
  token,
  params
}) => {
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof QuizSchema>>({
    resolver: zodResolver(QuizSchema),
    mode: 'onChange',
    defaultValues: {
      quizLevel: 0,
      quizName: ''
    }
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof QuizSchema>) => {
    try {
      startTransition(async () => {
        const response = await CreateQuizAction(token, lessonId, values);
        if (response.success) {
          router.push(
            `/dashboard/subject/${params.subjectId}/chapter/${params.chapterId}/lesson/${lessonId}/quiz/${response.data}/create`
          );
        } else {
          toast({
            description: 'Failed to create a new quiz',
            variant: 'destructive'
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create a new quiz"
      description="Let's add the new quiz information"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full flex-col space-y-4 pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="quizName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lesson name</FormLabel>
                  <FormControl>
                    <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                      <div className="flex w-full flex-col">
                        <Input
                          disabled={isPending}
                          type="text"
                          placeholder="Enter quiz name"
                          className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quizLevel"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Lesson name</FormLabel>
                  <FormControl>
                    <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                      <div className="flex w-full flex-col">
                        <Input
                          disabled={isPending}
                          type="number"
                          placeholder="Enter quiz level"
                          className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex w-full justify-end space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                    Creating
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
