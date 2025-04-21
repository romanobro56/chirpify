import React from 'react';
import Image from 'next/image';

interface Props {
    birdName: string;
    birdImgUrl: string;
}

const BirdContainer: React.FC<Props> = ({
    birdName,
    birdImgUrl
}) => {
  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
        <Image
            alt={birdName}
            width={60}
            height={60}
            src={`${birdImgUrl}`}
            className="rounded-md w-12 h-12 sm:w-16 sm:h-16 object-cover flex-shrink-0"
        />
        <p className="text-sm sm:text-lg font-medium leading-tight">
            {birdName}
        </p>
    </div>
  );
};

export default BirdContainer;