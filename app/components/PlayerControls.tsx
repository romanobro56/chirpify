// app/components/PlayerControls.tsx
'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2 } from "lucide-react";
import Image from "next/image";
import { useAudio } from '@/app/components/AudioProvider';

export function PlayerControls() {
    const { 
        currentBird, 
        isPlaying, 
        progress, 
        togglePlayPause,
        seek,
        duration,
        currentTime,
        revealBird
    } = useAudio();

    // Format time as mm:ss
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        const clickPercent = (clickPosition / progressBarWidth) * 100;
        seek(clickPercent);
    };

    return (
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between border-t border-gray-800">
            <div className="flex items-center space-x-4">
                {currentBird ? (
                    <>
                        <Image
                            src={revealBird ? currentBird.imgUrl : "/unknown_bird.png"}
                            width={56}
                            height={56}
                            alt="Now playing"
                            className="w-14 h-14 rounded-md object-cover"
                        />
                        <div>
                            <p className="font-semibold">{revealBird ? currentBird.name : "Unknown Bird"}</p>
                            <p className="text-sm text-gray-400">Bird Song</p>
                        </div>
                    </>
                ) : (
                    <div className="text-gray-500">No bird selected</div>
                )}
            </div>
            <div className="flex flex-col items-center max-w-md w-2/5">
                <div className="flex items-center space-x-6">
                    <Shuffle size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                    <SkipBack size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                    <button 
                        className="bg-white text-black rounded-full p-2 hover:scale-105 transition"
                        onClick={togglePlayPause}
                        disabled={!currentBird}
                    >
                        {isPlaying ? (
                            <Pause fill="currentColor" size={20} />
                        ) : (
                            <Play fill="currentColor" size={20} />
                        )}
                    </button>
                    <SkipForward size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                    <Repeat size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                </div>
                <div className="w-full mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
                    <div 
                        className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer relative"
                        onClick={handleProgressClick}
                    >
                        <div 
                            className="h-full bg-white rounded-full absolute top-0 left-0" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs text-gray-400">{formatTime(duration)}</span>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <Volume2 size={20} />
                <div className="w-24 h-1 bg-gray-700 rounded-full relative">
                    <div className="h-full bg-white rounded-full absolute top-0 left-0 w-2/3"></div>
                </div>
            </div>
        </div>
    );
}