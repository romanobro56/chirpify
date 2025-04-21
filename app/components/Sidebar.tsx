import React from 'react';
import { Home, Search, Library, PlusSquare, Heart, Download } from "lucide-react";
import Image from 'next/image';

const playlists = [
  "Northeast Nesting Notes",
  "Backyard Bird Beats",
  "Woodland Warbler Wonders",
  "Coastal Chirping Classics",
  "Wetland Whistlers",
  "Mountain Melody Makers",
  "Desert Dawn Chorus",
  "Tropical Treetop Tunes",
  "Migratory Mixtape",
  "Rare Bird Records"
];

export function Sidebar() {
  return (
    <div className="w-60 bg-black text-gray-300 flex flex-col h-full shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <Image src={"/logo_3.webp"} alt="logo" width={35} height={35} />
          Chirpify
        </h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-white p-2 rounded">
                <Home size={24} />
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-white p-2 rounded">
                <Search size={24} />
                <span>Discover</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 hover:text-white p-2 rounded">
                <Library size={24} />
                <span>Your Collection</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="mt-8 space-y-4">
          <button className="flex items-center space-x-2 hover:text-white w-full p-2 rounded">
            <PlusSquare size={24} />
            <span>Create Quiz</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-white w-full p-2 rounded">
            <Heart size={24} />
            <span>Favorite Birds</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden border-t border-gray-800 mt-4"> 
        <div className="h-full overflow-y-auto px-6 py-4"> 
          <h2 className="text-sm uppercase font-semibold mb-4">Quiz Collections</h2>
          <ul className="space-y-2">
            {playlists.map((playlist, index) => (
              <li key={index}>
                <a href="#" className="hover:text-white text-sm block p-1 rounded">
                  {playlist}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-6 border-t border-gray-800"> 
        <button className="flex items-center space-x-2 hover:text-white w-full p-2 rounded">
          <Download size={24} />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
}