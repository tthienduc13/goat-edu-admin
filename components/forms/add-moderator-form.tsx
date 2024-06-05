'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { AddModerSchema } from '@/schemas';
import { AddModer } from '@/app/(dashboard)/dashboard/moderator/actions/add-moderator';
import { useSession } from 'next-auth/react';
import { useToast } from '../ui/use-toast';
// import FileUpload from '../file-upload';
import { useRouter } from 'next/navigation';

export const IMG_MAX_LIMIT = 3;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export const AddModerForm: React.FC<ProductFormProps> = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof AddModerSchema>>({
    resolver: zodResolver(AddModerSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullname: '',
      username: '',
      phoneNumber: ''
    }
  });

  const session = useSession();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof AddModerSchema>) => {
    if (session.data !== null) {
      try {
        setIsPending(!isPending);
        if (session.data !== null) {
          const response = await AddModer(values, session.data.user?.token);
          if (response.status == 200) {
            toast({
              description: `${values.username} added successfully !`
            });
            router.push(`/dashboard/moderator`);
          } else {
            toast({
              description: `${response.message}`,
              variant: 'destructive'
            });
          }
        }
      } catch (error: any) {
      } finally {
        setIsPending(false);
      }
    }
  };

  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-full flex-col space-y-5">
          <div className="border-b pb-2">
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
              Add a new moderator
            </h2>
            <p className="[&:not(:first-child)]: leading-7">
              Input information of the new moderator.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="">
              <div className="grid w-full grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="Email"
                          placeholder="Enter the Email"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter fullname"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter username"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter phone number"
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
                <Button
                  type="submit"
                  disabled={isPending}
                  onClick={() => {
                    toast;
                  }}
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
