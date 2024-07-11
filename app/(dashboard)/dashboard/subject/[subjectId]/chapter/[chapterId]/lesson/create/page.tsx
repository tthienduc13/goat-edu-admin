'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

import { LessonSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerDownLeft } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Textarea } from '@/components/ui/textarea';
import { CreateLessonAction } from '@/actions/lesson/create-lesson';
interface LessonCreatePageProps {
  params: {
    subjectId: string;
    chapterId: string;
  };
}

const LessonCreatePage = ({ params }: LessonCreatePageProps) => {
  const { subjectId, chapterId } = params;
  const [isPending, setIsPending] = useState<boolean>(false);
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  const form = useForm<z.infer<typeof LessonSchema>>({
    resolver: zodResolver(LessonSchema),
    mode: 'onChange',
    defaultValues: {
      displayOrder: 0,
      lessonBody: '',
      lessonName: ''
    }
  });
  const onSubmit = async (values: z.infer<typeof LessonSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const createResponse = await CreateLessonAction(
          session.data?.user?.token as string,
          chapterId,
          values
        );
        if (createResponse === 200) {
          toast({
            description: `Lesson created successfully !`
          });
          router.back();
        } else {
          toast({
            description: `Failed to create Lesson`,
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
    <div className="flex w-full flex-col space-y-4 p-8">
      <div>
        <Button onClick={handleGoBack} className="space-x-2">
          <CornerDownLeft /> <span>Go back</span>
        </Button>
      </div>
      <Heading
        title={`Create lesson form.`}
        description="Manage Subject (Client side table functionalities.)"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full flex-col space-y-4">
            <div className="mt-4 grid w-full grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lessonName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Lesson name</FormLabel>
                    <FormControl>
                      <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Input
                            disabled={isPending}
                            type="text"
                            placeholder="Enter lesson name"
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
                name="displayOrder"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Display order</FormLabel>
                    <FormControl>
                      <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Input
                            disabled={isPending}
                            type="number"
                            placeholder="Enter display order."
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
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="lessonBody"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Lesson description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Enter lesson description"
                        className="resize-none border-0 bg-[#a8b3cf14]"
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
          </div>
        </form>
      </Form>
    </div>
  );
};
export default LessonCreatePage;
