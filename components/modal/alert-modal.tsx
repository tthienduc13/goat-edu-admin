'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => any;
  loading: boolean;
  userId: string;
  userName: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  userId,
  userName
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleConfirm = async () => {
    const response = await onConfirm(userId);
    if (response.status == 200) {
      toast({
        description: `${userName} deleted successfully`
      });
    } else {
      toast({
        description: `${response.message}`,
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={() => {
            toast;
            handleConfirm();
          }}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
