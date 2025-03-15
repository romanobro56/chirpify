'use client';

import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
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

    // Get a random set of birds including the correct one
    const getRandomChoices = (correctBird: IBirdFull): Bird[] => {
        const otherBirds = birds.filter(bird => bird.name !== correctBird.name);
        const shuffled = [...otherBirds].sort(() => 0.5 - Math.random());
        const selectedBirds = shuffled.slice(0, 3).map(bird => ({
            name: bird.name,
            song: `/birds/sounds/${bird.id}.mp3`,
            imgUrl: `/birds/images/${bird.id}.jpg`
        }));
        
        // Add the correct bird and shuffle again
        const correctBirdSimplified: Bird = {
            name: correctBird.name,
            song: `/birds/sounds/${correctBird.id}.mp3`,
            imgUrl: `/birds/images/${correctBird.id}.jpg`
        };
        
        const allChoices = [...selectedBirds, correctBirdSimplified];
        return allChoices.sort(() => 0.5 - Math.random());
    };

    // Set up a new question
    const setupQuestion = () => {
        if (birds.length === 0) return;
        
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

    // Handle moving to the next question
    const handleNextQuestion = () => {
        if (questionsAnswered >= 10) {
            // Reset the quiz after 10 questions
            setScore(0);
            setQuestionsAnswered(0);
        }
        setupQuestion();
    };

    // Handle when user answers correctly
    const handleCorrectAnswer = () => {
        setScore(score + 1);
        setQuestionsAnswered(questionsAnswered + 1);
    };

    // Start the quiz
    const startQuiz = () => {
        setQuizStarted(true);
        setScore(0);
        setQuestionsAnswered(0);
        setupQuestion();
    };

    // Initialize the quiz when birds are loaded
    useEffect(() => {
        if (!loading && birds.length > 0) {
            setupQuestion();
        }
    }, [loading, birds]);

    if (loading) {
        return <Typography>Loading bird data...</Typography>;
    }

    if (error) {
        return <Typography color="error">Error loading bird data: {error}</Typography>;
    }

    return (
        <div className="flex-1 bg-gradient-to-b from-blue-900 to-black text-white p-8 overflow-y-auto">
            <div className="flex items-center space-x-4 mb-8">
                <Image
                    src="/birds/images/cardinalis_cardinalis.jpg" 
                    width={200}
                    height={200}
                    alt="Playlist cover"
                    className="w-52 h-52 shadow-lg"
                />
                <div>
                    <p className="text-sm font-semibold">QUIZ COLLECTION</p>
                    <h1 className="text-5xl font-bold mt-2 mb-4">Northeast Nesting Notes</h1>
                    <p className="text-sm text-gray-300">Created by Chirpify • {birds.length} birds, 10 questions</p>
                    <p className="mt-2 text-sm">
                        Score: {score} / {questionsAnswered}
                    </p>
                </div>
            </div>
            
            <div className="mb-8">
                <button 
                    className="bg-green-500 text-black font-semibold py-3 px-8 rounded-full hover:bg-green-400"
                    onClick={startQuiz}
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
        </div>
    );
}