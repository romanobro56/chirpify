import React from 'react';
import BirdContainer from './BirdContainer';
import { XCircle } from 'lucide-react'; // Using Lucide icon

interface Props {
    correctBird: string;
    correctBirdImgUrl: string;
}

const WrongChoice: React.FC<Props> = ({
    correctBird,
    correctBirdImgUrl
}) => {
    return (
        <div className="bg-red-900/40 border border-red-500/50 rounded-md p-4 sm:p-6 flex items-center space-x-4 sm:space-x-6">
            <div className="flex-shrink-0">
                <XCircle size={40} className="text-red-400 w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div>
                <p className="text-lg sm:text-2xl font-bold text-red-400 mb-1 sm:mb-2">Incorrect! It was:</p>
                <BirdContainer birdName={correctBird} birdImgUrl={correctBirdImgUrl} />
            </div>
        </div>
    );
};

export default WrongChoice;