'use client';
import { getSubjectById } from '@/app/api/subject/subject.api';

import { Subject } from '@/types/subject';

import { useSession } from 'next-auth/react';

import { useEffect, useRef, useState } from 'react';

import * as z from 'zod';

import sampleImage from '@/assets/img/sample2.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { SubjectSchema } from '@/schemas';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

import { getImageData } from '@/actions/get-image-data';
import { UpdateSubjectAction } from '@/actions/subject/update-subject';

import EditIconAnimate from '@/assets/gif/edit.gif';
import EditIconPause from '@/assets/gif/edit_pause.png';

import SubjectFormLoading from '../_components/update-form-loading';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CornerDownLeft } from 'lucide-react';
import ChapterList from '../_components/chapter/chapter-list';
import { Chapter } from '@/types/chapter';
import { Textarea } from '@/components/ui/textarea';
interface SubjectDetailPageProps {
  params: { subjectId: string };
}

const SubjectDetailPage = ({ params }: SubjectDetailPageProps) => {
  const [subject, setSubject] = useState<Subject>();
  const [chapterList, setChapterList] = useState<Chapter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [imageState, setImageState] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const session = useSession();
  const { toast } = useToast();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  const handleEditClick = () => {
    setIsEdit(!isEdit);
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getSubjectById(
          params.subjectId,
          session.data?.user?.token as string
        );
        setSubject(response);
        setChapterList(response.chapters);
        form.reset({
          subjectName: response.subjectName,
          subjectCode: response.subjectCode,
          subjectInformation: response.information,
          subjectClass: response.class
        });
        form.setValue('subjectClass', response.class);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.subjectId, session.data?.user?.token]);

  const handleBrowseImage = () => {
    document.getElementById('imageImporter')?.click();
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

  const onSubmit = async (values: z.infer<typeof SubjectSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        const newFormData = { ...values, subjectImage: imageState };
        const updateResponse = await UpdateSubjectAction(
          newFormData,
          params.subjectId,
          session.data?.user?.token as string
        );
        if (updateResponse === 200) {
          toast({
            description: `Subject updated successfully !`
          });
        } else {
          toast({
            description: `Failed to update Subject`,
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
        setIsEdit(false);
      }
    }
  };

  if (isLoading) {
    return <SubjectFormLoading />;
  }
  return (
    <div className=" max-h-screen w-full space-y-4 overflow-y-auto p-8">
      <Button onClick={handleGoBack} className="space-x-2">
        {' '}
        <CornerDownLeft /> <span>Go back</span>
      </Button>
      <div className="flex items-center space-x-4">
        <Heading
          title="Subject information"
          description="Manage Subject (Client side table functionalities.)"
        />
        <button
          className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[50%] transition hover:scale-125 hover:border-[1px] hover:border-blue-700"
          onClick={handleEditClick}
        >
          <Image
            src={!isEdit ? EditIconAnimate : EditIconPause}
            alt="Edit"
            width={18}
            height={18}
          />
        </button>
      </div>

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
                            disabled={isEdit || isPending}
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
                            disabled={isEdit || isPending}
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
                      <div className="flex w-full flex-row items-start overflow-hidden rounded-xl bg-[#a8b3cf14] px-4">
                        <div className="flex w-full flex-col">
                          <Textarea
                            disabled={isPending || isEdit}
                            placeholder="Enter lesson description"
                            className="h-24 resize-none border-0 bg-[#a8b3cf14] text-base text-muted-foreground"
                            {...field}
                          />
                          {/* <Input
                            type="text"
                            disabled={isEdit || isPending}
                            placeholder="Enter subject information"
                            className="border-none text-base text-muted-foreground shadow-none outline-none focus-visible:ring-0"
                            {...field}
                          /> */}
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={subject?.class}
                      disabled={isEdit || isPending}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={subject?.class} />
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
                          disabled={isEdit || isPending}
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
                        disabled={isEdit || isPending}
                        multiple
                        ref={fileInputRef}
                        onChange={(event) => handleOnChangeSeleteImage(event)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Image
                  src={preview ? preview : sampleImage}
                  height={200}
                  width={0}
                  alt="No data"
                  className="w-full rounded-2xl object-fill"
                ></Image>
              </div>
              <div className="flex w-full justify-end">
                {!isEdit &&
                  (isPending ? (
                    <>
                      <Button type="submit">
                        <AiOutlineLoading3Quarters className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                      </Button>
                    </>
                  ) : (
                    <Button disabled={isLoading} type="submit">
                      Update
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </form>
      </Form>
      <Separator />
      <ChapterList
        subjectId={subject?.id}
        data={chapterList}
        numOfChapters={subject?.numberOfChapters}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SubjectDetailPage;
