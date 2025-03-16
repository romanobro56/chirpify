// app/context/AudioContext.tsx
'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

export interface Bird {
    name: string;
    song: string;
    imgUrl: string;
}

interface AudioContextType {
    currentBird: Bird | null;
    setCurrentBird: (bird: Bird | null) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    progress: number;
    audioRef: React.RefObject<HTMLAudioElement>;
    togglePlayPause: () => void;
    seek: (value: number) => void;
    duration: number;
    currentTime: number;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [currentBird, setCurrentBird] = useState<Bird | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlayPause = () => {
        if (!currentBird) return;
        
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    const seek = (value: number) => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            const newTime = (value / 100) * audioRef.current.duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const percent = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(percent);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    // Add event listeners to audio element
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.addEventListener('timeupdate', handleTimeUpdate);
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('ended', () => setIsPlaying(false));
            
            return () => {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('ended', () => setIsPlaying(false));
            };
        }
    }, [audioRef.current]);

    return (
        <AudioContext.Provider value={{
            currentBird,
            setCurrentBird,
            isPlaying, 
            setIsPlaying,
            progress,
            audioRef,
            togglePlayPause,
            seek,
            duration,
            currentTime
        }}>
            {children}
            <audio 
                ref={audioRef} 
                src={currentBird?.song || ''}
                onEnded={() => setIsPlaying(false)}
            />
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}