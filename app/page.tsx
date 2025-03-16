// app/page.tsx
'use client';

import React from 'react';
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { PlayerControls } from "./components/PlayerControls";
import { AudioProvider } from "./components/AudioProvider";

export default function Home() {
  return (
    <AudioProvider>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent />
        </div>
        <PlayerControls />
      </div>
    </AudioProvider>
  );
}