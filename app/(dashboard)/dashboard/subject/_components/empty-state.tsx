import Image from 'next/image';
import rocket from '@/assets/gif/rocket.png';
const Empty = () => {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center space-y-4">
      <Image src={rocket} alt="empty" height={200} width={200} color=""></Image>

      <h3 className="font-medium">
        Sorry, the resource that you are looking for is not existed.
      </h3>
    </div>
  );
};

export default Empty;
