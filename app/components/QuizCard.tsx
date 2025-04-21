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

    useEffect(() => {
        if (currentBird) {
            setCurrentBird(currentBird);
            setUserChoice(null);
            setRevealBird(false);
            setIsPlaying(false);
            setProgress(0);
        }
    }, [currentBird, setCurrentBird, setRevealBird, setIsPlaying, setProgress]);


    const handleBirdSelection = (birdName: string) => {
        if (userChoice !== null) return;
        setUserChoice(birdName);
        setRevealBird(true);
        if (birdName === currentBird.name) {
            onCorrectAnswer();
        }
        if (isPlaying) {
            togglePlayPause();
        }
    };

    const handleNext = () => {
        setUserChoice(null);
        onNextQuestion();
    };

    const isCorrect = userChoice === currentBird.name;
    const hasAnswered = userChoice !== null;

    return (
        <div className="rounded-lg bg-gray-800 p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-6">
                {/* Adjusted button styles */}
                <button
                    className="chirpify-button py-2 px-6 sm:py-3 sm:px-8 flex items-center text-sm sm:text-base"
                    onClick={togglePlayPause}
                    disabled={!currentBird}
                >
                    {isPlaying ? (
                        <><Pause size={20} className="mr-2" /> Pause Song</>
                    ) : (
                        <><Play size={20} className="mr-2" /> Play Song</>
                    )}
                </button>
                <p className="text-lg sm:text-2xl mt-4 font-bold text-center">Which bird is singing?</p>
            </div>

            {!hasAnswered ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {choices.map((bird) => (
                        <div
                            key={bird.name}
                            className="bg-gray-700 hover:bg-gray-600 p-3 sm:p-4 rounded-md cursor-pointer transition-colors duration-200"
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
                currentBird && <WrongChoice
                    correctBird={currentBird.name}
                    correctBirdImgUrl={currentBird.imgUrl}
                />
            )}

            {hasAnswered && (
                <button
                    className="chirpify-button w-full py-2 sm:py-3 mt-6 text-base sm:text-lg"
                    onClick={handleNext}
                >
                    Next Bird
                </button>
            )}
        </div>
    );
}

export default QuizCard;