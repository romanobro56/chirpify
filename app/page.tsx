'use client';

import React, { useState } from 'react';
import { Sidebar } from "./components/Sidebar";
import { MainContent } from "./components/MainContent";
import { PlayerControls } from "./components/PlayerControls";
import { AudioProvider } from "./components/AudioProvider";
import { Menu, X } from 'lucide-react';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AudioProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <div className="flex flex-1 overflow-hidden relative">
          <div className={`absolute lg:static top-0 left-0 h-full z-20 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col overflow-hidden">
            <button
              className="lg:hidden absolute top-4 left-4 z-30 text-white p-2 bg-black/50 rounded-md"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            {isSidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/30 z-10"
                onClick={() => setIsSidebarOpen(false)}
              ></div>
            )}
            <MainContent />
          </div>
        </div>
        <PlayerControls />
      </div>
    </AudioProvider>
  );
}