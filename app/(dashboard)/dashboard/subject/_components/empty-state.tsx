import Image from 'next/image';
import rocket from '@/assets/gif/rocket.png';
const Empty = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
      <Image src={rocket} alt="empty" height={200} width={200} color=""></Image>

      <h3 className="font-medium">
        Sorry, this subject does not have any chapter.
      </h3>
    </div>
  );
};

export default Empty;
