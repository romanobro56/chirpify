import React from 'react';
import BirdContainer from './BirdContainer';

interface Props {
    correctBird: string;
    correctBirdImgUrl: string;
}

const WrongChoice: React.FC<Props> = ({
    correctBird,
    correctBirdImgUrl
}) => {
    return (
        <div className="bg-red-900/40 border border-red-500/50 rounded-md p-6 flex items-center">
            <div className="mr-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#E53935">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </div>
            <div>
                <p className="text-2xl font-bold text-red-400 mb-2">Incorrect! It was:</p>
                <BirdContainer birdName={correctBird} birdImgUrl={correctBirdImgUrl} />
            </div>
        </div>
    );
};

export default WrongChoice;