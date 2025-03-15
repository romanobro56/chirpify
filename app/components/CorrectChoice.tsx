import React from 'react';
import BirdContainer from './BirdContainer';

interface Props {
    correctBird: string;
    correctBirdImgUrl: string;
}

const CorrectChoice: React.FC<Props> = ({
    correctBird,
    correctBirdImgUrl
}) => {
    return (
        <div className="bg-green-900/40 border border-green-500/50 rounded-md p-6 flex items-center">
            <div className="mr-6">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#1DB954">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
            </div>
            <div>
                <p className="text-2xl font-bold text-green-400 mb-2">Correct!</p>
                <BirdContainer birdName={correctBird} birdImgUrl={correctBirdImgUrl} />
            </div>
        </div>
    );
};

export default CorrectChoice;