'use client';

import React, { useState } from 'react';
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { PlayerControls } from "./components/PlayerControls";

export default function Home() {
  const [currentBird, setCurrentBird] = useState(null);
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>
      <PlayerControls currentBird={currentBird} />
    </div>
  );
}