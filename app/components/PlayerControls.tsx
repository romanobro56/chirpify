'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import Image from "next/image";

interface Props {
    currentBird: {
        name: string;
        song: string;
        imgUrl: string;
    } | null;
}

export function PlayerControls({ currentBird }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayPause = () => {
        if (!currentBird) return;
        
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(percent);
        }
    };

    return (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between border-t border-gray-800">
            <div className="flex items-center space-x-4">
                {currentBird ? (
                    <>
                        <Image
                            src={`/birds/${currentBird.imgUrl}`}
                            width={56}
                            height={56}
                            alt="Now playing"
                            className="w-14 h-14 rounded-md"
                        />
                        <div>
                            <p className="font-semibold">{currentBird.name}</p>
                            <p className="text-sm text-gray-400">Bird Song</p>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">No bird selected</div>
                )}
                
                {currentBird && (
                    <audio 
                        ref={audioRef} 
                        src={`/sounds/${currentBird.song}`}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={() => setIsPlaying(false)}
                    />
                )}
            </div>
            <div className="flex flex-col items-center max-w-md w-2/5">
                <div className="flex items-center space-x-6">
                    <Shuffle size={20} className="text-gray-400 hover:text-white" />
                    <SkipBack size={20} className="text-gray-400 hover:text-white" />
                    <button 
                        className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
                        onClick={handlePlayPause}
                        disabled={!currentBird}
                    >
                        {isPlaying ? (
                            <Pause fill="currentColor" size={20} />
                        ) : (
                            <Play fill="currentColor" size={20} />
                        )}
                    </button>
                    <SkipForward size={20} className="text-gray-400 hover:text-white" />
                    <Repeat size={20} className="text-gray-400 hover:text-white" />
                </div>
                <div className="w-full mt-2">
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Volume2 size={20} />
                <div className="w-24">
                    <div className="progress-bar">
                        <div className="progress-bar-fill w-2/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}