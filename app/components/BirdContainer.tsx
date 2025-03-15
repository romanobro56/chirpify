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
    <div className="flex items-center">
        <Image 
            alt={birdName} 
            width={60} 
            height={60} 
            src={`${birdImgUrl}`}
            className="rounded-md mr-4 object-cover"
        />
        <p className="text-lg font-medium">
            {birdName}
        </p>
    </div>
  );
};

export default BirdContainer;