'use client';

import React, { useState, useEffect } from 'react';
import { Play } from "lucide-react";
import QuizCard from './QuizCard';
import Image from 'next/image';

interface IBirdFull {
    id: string;
    name: string;
    scientificName: string;
    song: string;
    imgUrl: string;
    region: string;
    location: string;
    recordist: string;
    license: string;
    url: string;
    date: string;
    quality: string;
    type: string;
}

type Bird = Pick<IBirdFull, "song" | "name" | "imgUrl">;

export function MainContent() {
    const [birds, setBirds] = useState<IBirdFull[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentBirdIndex, setCurrentBirdIndex] = useState<number>(0);
    const [choices, setChoices] = useState<Bird[]>([]);
    const [score, setScore] = useState<number>(0);
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [activeBird, setActiveBird] = useState<Bird | null>(null);
    const [quizStarted, setQuizStarted] = useState<boolean>(false);

    // Fetch bird data
    useEffect(() => {
        async function fetchBirds() {
            try {
                const response = await fetch('/bird_metadata.json');
                if (!response.ok) {
                    throw new Error(`Failed to fetch bird data: ${response.status}`);
                }
                const data = await response.json();
                setBirds(data.birds);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
                setLoading(false);
            }
        }

        fetchBirds();
    }, []);

    const getRandomChoices = (correctBird: IBirdFull): Bird[] => {
        const otherBirds = birds.filter(bird => bird.name !== correctBird.name);
        const shuffled = [...otherBirds].sort(() => 0.5 - Math.random());
        const numChoices = Math.min(3, shuffled.length);
        const selectedBirds = shuffled.slice(0, numChoices).map(bird => ({
            name: bird.name,
            song: `/birds/sounds/${bird.id}.mp3`,
            imgUrl: `/birds/images/${bird.id}.jpg`
        }));

        const correctBirdSimplified: Bird = {
            name: correctBird.name,
            song: `/birds/sounds/${correctBird.id}.mp3`,
            imgUrl: `/birds/images/${correctBird.id}.jpg`
        };

        const allChoices = [...selectedBirds, correctBirdSimplified];
        return allChoices.sort(() => 0.5 - Math.random());
    };

    const setupQuestion = () => {
        if (birds.length === 0) return;

        if (birds.length < 4) {
            console.warn("Not enough birds loaded to create a full quiz choice set.");
            setError("Not enough bird data to start the quiz.");
            return;
        }

        const randomIndex = Math.floor(Math.random() * birds.length);
        setCurrentBirdIndex(randomIndex);

        const simplifiedBird: Bird = {
            name: birds[randomIndex].name,
            song: `/birds/sounds/${birds[randomIndex].id}.mp3`,
            imgUrl: `/birds/images/${birds[randomIndex].id}.jpg`
        };

        setActiveBird(simplifiedBird);
        setChoices(getRandomChoices(birds[randomIndex]));
    };

    const handleNextQuestion = () => {
        if (questionsAnswered >= 10) {
            setScore(0);
            setQuestionsAnswered(0);
        }
        setupQuestion();
    };

    const handleCorrectAnswer = () => {
        setScore(score + 1);
        setQuestionsAnswered(questionsAnswered + 1);
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setScore(0);
        setQuestionsAnswered(0);
        setupQuestion(); 
    };

    useEffect(() => {
        if (!loading && birds.length > 0 && !quizStarted) {
        }
    }, [loading, birds, quizStarted]);

    if (loading) {
        return <div className="flex justify-center items-center h-full text-white"><p>Loading bird data...</p></div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-full text-red-400"><p>Error: {error}</p></div>;
    }

    return (
        <div className="flex-1 bg-gradient-to-b from-blue-900 to-black text-white p-4 pt-16 lg:pt-8 lg:p-8 overflow-y-auto">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                <Image
                    src="/birds/images/cardinalis_cardinalis.jpg"
                    width={200}
                    height={200}
                    alt="Playlist cover"
                    className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52 shadow-lg rounded-md" 
                />
                <div className="text-center sm:text-left">
                    <p className="text-xs sm:text-sm font-semibold">QUIZ COLLECTION</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1 mb-2 sm:mt-2 sm:mb-4">Northeast Nesting Notes</h1>
                    <p className="text-xs sm:text-sm text-gray-300">Created by Chirpify • {birds.length} birds, 10 questions</p>
                    <p className="mt-2 text-sm">
                        Score: {score} / {questionsAnswered}
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <button
                    className="bg-green-500 text-black font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full hover:bg-green-400 flex items-center mx-auto sm:mx-0" // Center button on mobile
                    onClick={startQuiz}
                    disabled={loading || !!error || (birds.length < 4 && !quizStarted)}
                >
                    <Play fill="currentColor" size={20} className="inline mr-2" />
                    {quizStarted ? "Restart Quiz" : "Start Quiz"}
                </button>
            </div>

            {quizStarted && activeBird && (
                <QuizCard
                    currentBird={activeBird}
                    choices={choices}
                    onNextQuestion={handleNextQuestion}
                    onCorrectAnswer={handleCorrectAnswer}
                />
            )}

             <div className="h-16"></div>
        </div>
    );
}