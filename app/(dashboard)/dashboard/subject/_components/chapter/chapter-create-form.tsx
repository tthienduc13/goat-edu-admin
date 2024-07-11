'use client';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { ChapterSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

import { useForm } from 'react-hook-form';

import * as z from 'zod';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { useSession } from 'next-auth/react';

import { CreateChapterAction } from '@/actions/chapter/create-chapter';

import { CornerDownLeft } from 'lucide-react';

interface ChapterCreateFormProps {
  subjectId: string;
}

const ChapterCreateForm = ({ subjectId }: ChapterCreateFormProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();
  const handleGoBack = () => {
    router.back();
  };
  const form = useForm<z.infer<typeof ChapterSchema>>({
    resolver: zodResolver(ChapterSchema),
    mode: 'onChange',
    defaultValues: {
      chapterLevel: 0,
      chapterName: ''
    }
  });
  const onSubmit = async (values: z.infer<typeof ChapterSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const createResponse = await CreateChapterAction(
          session.data?.user?.token as string,
          subjectId,
          values
        );
        if (createResponse === 200) {
          toast({
            description: `Chapter created successfully !`
          });
          router.back();
        } else {
          toast({
            description: `Failed to create chapter`,
            variant: 'destructive'
          });
        }
      } catch (error: any) {
        toast({
          description: `An error occurred: ${error.message}`,
          variant: 'destructive'
        });
      } finally {
        setIsPending(false);
      }
    }
  };
  return (
    <div className="space-y-4 p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      <Heading
        title="Create chapter form"
        description="Manage Subject (Client side table functionalities.)"
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="mt-4 grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="chapterName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Chapter name</FormLabel>
                  <FormControl>
                    <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                      <div className="flex w-full flex-col">
                        <Input
                          disabled={isPending}
                          type="text"
                          placeholder="Enter chapter name"
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
              name="chapterLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chapter level</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[48px]"
                      type="number"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex w-full justify-end">
            {isPending ? (
              <>
                <Button disabled={isPending}>
                  <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                  Creating
                </Button>
              </>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
export default ChapterCreateForm;
