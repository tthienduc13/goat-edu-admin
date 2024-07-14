'use client';
import {
  approveDiscussion,
  getDiscussionById
} from '@/app/api/discussion/discussion.api';
import { Button } from '@/components/ui/button';
import { LatexRenderer } from '@/lib/latex-render';
import { Discussion } from '@/types/discussion';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { DiscussedStatus } from '../_components/discussed-status';
import { useRouter } from 'next/navigation';

interface DiscussedDetailPageProps {
  params: {
    slug: string;
  };
}
const DiscussionPreview = ({ params }: DiscussedDetailPageProps) => {
  const router = useRouter();
  const session = useSession();
  const [data, setData] = useState<Discussion>();

  const getDiscussion = async () => {
    const response = await getDiscussionById({
      token: session.data?.user?.token!,
      id: params.slug
    });
    setData(response);
  };

  useEffect(() => {
    getDiscussion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApprove = async () => {
    await approveDiscussion({
      token: session.data?.user?.token!,
      id: data?.id!
    });
    router.push('/dashboard/discussion');
  };

  return (
    <div className="h-full w-full p-4">
      <div className="flex h-[calc(100vh-80px-64px)] w-full flex-col gap-y-5">
        <div className="left-0 flex w-full items-center justify-between rounded-lg border-[2px] px-5 py-4 shadow-lg">
          <div className="flex flex-col gap-y-1">
            <div className="flex w-full flex-row items-center gap-x-2">
              <h1 className="text-2xl font-semibold">{data?.discussionName}</h1>
            </div>
            <div className="flex flex-row items-center gap-x-2">
              {data?.tags.map((tag) => (
                <Button
                  key={tag.id}
                  variant={'secondary'}
                  className="rounded-lg px-2 py-1 text-sm"
                >
                  #{tag.tagName}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <DiscussedStatus status={data?.status!} />
            <Button onClick={handleApprove}>Approve</Button>
          </div>
        </div>
        <div className="flex w-full flex-row items-center justify-between">
          <h3>Preview Content</h3>
          <div className="text-sm">
            {new Date(data?.createdAt!).toLocaleDateString()}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-y-2  rounded-lg border-[2px] px-5 py-4 shadow-lg">
          <LatexRenderer latex={data?.discussionBodyHtml!} />
        </div>
      </div>
    </div>
  );
};

export default DiscussionPreview;
