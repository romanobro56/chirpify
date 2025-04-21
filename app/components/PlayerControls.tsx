'use client';

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX } from "lucide-react";
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
        revealBird,
        audioRef
    } = useAudio();

    const [volume, setVolume] = React.useState(1);
    const [isMuted, setIsMuted] = React.useState(false);

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || seconds < 0) return "0:00"; 
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const progressBarWidth = rect.width;
        if (progressBarWidth === 0) return;
        const clickPercent = (clickPosition / progressBarWidth) * 100;
        seek(clickPercent);
    };

     // Handle Volume Change
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
        setIsMuted(newVolume === 0); 
    };

    // Handle Mute Toggle
    const toggleMute = () => {
        if (audioRef.current) {
            const currentlyMuted = audioRef.current.volume === 0 || isMuted;
            if (currentlyMuted) {
                const restoreVolume = volume > 0 ? volume : 0.5;
                setVolume(restoreVolume);
                audioRef.current.volume = restoreVolume;
                setIsMuted(false);
            } else {
                audioRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };


    return (
        <div className="bg-gray-900 text-white p-2 sm:p-4 flex flex-col md:flex-row items-center justify-between border-t border-gray-800">
            <div className="w-full md:w-1/4 flex items-center space-x-3 md:space-x-4 mb-2 md:mb-0">
                {currentBird ? (
                    <>
                        <Image
                            src={revealBird ? currentBird.imgUrl : "/unknown_bird.png"}
                            width={40}
                            height={40}
                            alt="Now playing"
                            className="w-10 h-10 sm:w-14 sm:h-14 rounded-md object-cover flex-shrink-0" 
                        />
                        <div className="overflow-hidden whitespace-nowrap">
                            <p className="text-sm sm:text-base font-semibold truncate">{revealBird ? currentBird.name : "Unknown Bird"}</p>
                            <p className="text-xs sm:text-sm text-gray-400">Bird Song</p>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center h-10 sm:h-14 text-gray-500 text-sm">No bird playing</div>
                )}
            </div>

            <div className="w-full md:w-2/5 flex flex-col items-center">
                <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 mb-1 md:mb-0">
                    <Shuffle size={18} className="hidden sm:inline-block text-gray-400 hover:text-white cursor-pointer" />
                    <SkipBack size={18} className="text-gray-400 hover:text-white cursor-pointer" />
                    <button
                        className="bg-white text-black rounded-full p-1.5 sm:p-2 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={togglePlayPause}
                        disabled={!currentBird}
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                            <Pause fill="currentColor" size={20} />
                        ) : (
                            <Play fill="currentColor" size={20} className="ml-0.5"/>
                        )}
                    </button>
                    <SkipForward size={18} className="text-gray-400 hover:text-white cursor-pointer" />
                    <Repeat size={18} className="hidden sm:inline-block text-gray-400 hover:text-white cursor-pointer" />
                </div>
                <div className="w-full mt-1 flex items-center gap-2 px-2 md:px-0">
                    <span className="text-xs text-gray-400 w-8 text-right">{formatTime(currentTime)}</span>
                    <div
                        className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group relative"
                        onClick={handleProgressClick}
                    >
                        <div
                            className="h-full bg-white group-hover:bg-green-500 rounded-full relative"
                            style={{ width: `${progress}%` }}
                        >
                             <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span className="text-xs text-gray-400 w-8 text-left">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="hidden md:flex w-1/4 items-center justify-end space-x-2 pr-4">
                 <button onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
                    {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                 </button>
                 <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-24 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer accent-white hover:accent-green-500"
                    aria-label="Volume"
                 />
            </div>
        </div>
    );
}