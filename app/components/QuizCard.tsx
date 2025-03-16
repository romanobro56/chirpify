// app/components/QuizCard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import BirdContainer from './BirdContainer';
import CorrectChoice from './CorrectChoice';
import WrongChoice from './WrongChoice';
import { Play, Pause } from "lucide-react";
import { useAudio } from '@/app/components/AudioProvider';

interface IBird {
    song: string;
    name: string;
    imgUrl: string;
}

interface Props {
    currentBird: IBird;
    choices: IBird[];
    onNextQuestion: () => void;
    onCorrectAnswer: () => void;
}

const QuizCard: React.FC<Props> = ({
    currentBird,
    choices,
    onNextQuestion,
    onCorrectAnswer
}) => {
    const [userChoice, setUserChoice] = useState<string | null>(null);
    const { 
        setCurrentBird, 
        isPlaying, 
        togglePlayPause,
        setRevealBird,
        setProgress,
        setIsPlaying
    } = useAudio();

    // Update audio context when currentBird changes
    useEffect(() => {
        setCurrentBird(currentBird);
        setUserChoice(null);
        setRevealBird(false); // Hide the bird for the new question
    }, [currentBird, setCurrentBird, setRevealBird]);

    const handleBirdSelection = (birdName: string) => {
        setUserChoice(birdName);
        setRevealBird(true); // Reveal the bird when user makes a selection
        if (birdName === currentBird.name) {
            onCorrectAnswer();
        }
    };

    const handleNext = () => {
        setUserChoice(null);
        setProgress(0);
        setIsPlaying(false);
        onNextQuestion();
    };

    const isCorrect = userChoice === currentBird.name;
    const hasAnswered = userChoice !== null;

    return (
        <div className="chirpify-card rounded-lg bg-gray-800 p-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-6">
                <button 
                    className="chirpify-button py-3 px-8 flex items-center"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? (
                        <><Pause size={20} className="mr-2" /> Pause Bird Song</>
                    ) : (
                        <><Play size={20} className="mr-2" /> Play Bird Song</>
                    )}
                </button>
                <p className="text-2xl mt-4 font-bold">Which bird is singing?</p>
            </div>

            {!hasAnswered ? (
                <div className="grid grid-cols-2 gap-4">
                    {choices.map((bird) => (
                        <div 
                            key={bird.name}
                            className="bg-gray-700 hover:bg-gray-600 p-4 rounded-md cursor-pointer transition-all"
                            onClick={() => handleBirdSelection(bird.name)}
                        >
                            <BirdContainer 
                                birdName={bird.name} 
                                birdImgUrl={bird.imgUrl} 
                            />
                        </div>
                    ))}
                </div>
            ) : isCorrect ? (
                <CorrectChoice 
                    correctBird={currentBird.name} 
                    correctBirdImgUrl={currentBird.imgUrl} 
                />
            ) : (
                <WrongChoice 
                    correctBird={currentBird.name} 
                    correctBirdImgUrl={currentBird.imgUrl} 
                />
            )}

            {hasAnswered && (
                <button 
                    className="chirpify-button w-full py-3 mt-6 text-lg"
                    onClick={handleNext}
                >
                    Next Bird
                </button>
            )}
        </div>
    );
}

export default QuizCard;