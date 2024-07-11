'use client';
import * as z from 'zod';

import { Heading } from '@/components/ui/heading';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useRef, useState } from 'react';

import { useForm } from 'react-hook-form';

import { SubjectSchema } from '@/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { getImageData } from '@/actions/get-image-data';

import { CreateSubjectAction } from '@/actions/subject/create-subject';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CornerDownLeft } from 'lucide-react';

import defaultBook from '@/assets/img/default-book.png';

const SubjectCreateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [imageState, setImageState] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const session = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const isValidFileType = (file: File) => {
    const acceptedTypes = ['image/png', 'image/jpeg'];
    return acceptedTypes.includes(file.type);
  };

  const handleOnChangeSeleteImage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target?.files?.[0];
    if (file && isValidFileType(file)) {
      const { files, displayUrl } = getImageData(event);
      setPreview(displayUrl);
      setImageState(files[0]);
    } else {
      setImageState(null);
      alert('Invalid file type!');
    }
  };
  const form = useForm<z.infer<typeof SubjectSchema>>({
    resolver: zodResolver(SubjectSchema),
    mode: 'onChange',
    defaultValues: {
      subjectName: '',
      subjectImage: '',
      subjectCode: '',
      subjectInformation: '',
      subjectClass: ''
    }
  });
  const handleBrowseImage = () => {
    document.getElementById('imageImporter')?.click();
  };

  const onSubmit = async (values: z.infer<typeof SubjectSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const newFormData = { ...values, subjectImage: imageState };
        const updateResponse = await CreateSubjectAction(
          session.data?.user?.token as string,
          newFormData
        );
        if (updateResponse === 200) {
          toast({
            description: `Subject created successfully !`
          });
          router.push('/dashboard/subject');
        } else {
          toast({
            description: `Failed to create Subject`,
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
    <div className=" max-h-screen w-full space-y-4 overflow-y-auto p-4">
      <Button onClick={handleGoBack} className="space-x-2">
        {' '}
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      <Heading
        title="Create subject form."
        description="Manage Subject (Client side table functionalities.)"
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex w-full justify-evenly pb-20">
            <div className="flex w-[600px] flex-col space-y-4">
              <FormField
                control={form.control}
                name="subjectName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject name</FormLabel>
                    <FormControl>
                      <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Input
                            disabled={isPending}
                            type="text"
                            placeholder="Enter subject name"
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
                name="subjectCode"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject code (ABCD123 - ABC123)</FormLabel>
                    <FormControl>
                      <div className="flex h-12 w-full flex-row items-center overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Input
                            type="text"
                            disabled={isPending}
                            placeholder="Enter subject code"
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
                name="subjectInformation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject information</FormLabel>
                    <FormControl>
                      <div className="flex h-24 w-full flex-row items-start overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Input
                            type="text"
                            disabled={isPending}
                            placeholder="Enter subject information"
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
                name="subjectClass"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject class</FormLabel>
                    <Select onValueChange={field.onChange} disabled={isPending}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Class 10">Class 10</SelectItem>
                        <SelectItem value="Class 11">Class 11</SelectItem>
                        <SelectItem value="Class 12">Class 12</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="subject-imgage space-y-4">
              <FormField
                control={form.control}
                name="subjectImage"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>
                      <div className="flex items-center justify-between">
                        Subject image
                        <Button
                          type="button"
                          size="sm"
                          disabled={isPending}
                          onClick={() => handleBrowseImage()}
                        >
                          Choose Image
                        </Button>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        name="file"
                        id="imageImporter"
                        className="hidden"
                        disabled={isPending}
                        multiple
                        ref={fileInputRef}
                        onChange={(event) => handleOnChangeSeleteImage(event)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="h-[200px] w-full ">
                <Image
                  src={preview ? preview : defaultBook}
                  height={0}
                  width={0}
                  alt="No data"
                  className="h-full w-full rounded-2xl object-cover"
                ></Image>
              </div>
              <div className="flex w-full justify-end">
                {isPending ? (
                  <>
                    <Button type="submit" disabled={isPending}>
                      <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                      Creating
                    </Button>
                  </>
                ) : (
                  <Button disabled={isLoading} type="submit">
                    Create
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default SubjectCreateForm;
