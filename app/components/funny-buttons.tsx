'use client'

import { useState } from "react";

export default function FunnyButtons() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 60);

    setNoPos({ x, y });
  };

  return (
    <main className="min-h-screen w-screen bg-pink-400 p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl h-2/3 bg-pink-700/80 rounded-xl p-6 flex flex-col items-center justify-center gap-10 relative overflow-hidden">

        <h1 className="text-white text-xl text-center">
          Jössz megbeszélni velem a dolgokat?
        </h1>

        {/* YES button */}
        <button
          className="px-6 py-3 bg-green-400 hover:bg-green-300 text-white font-bold rounded-full shadow-lg transition-transform active:scale-95"
        >
          Igen ❤️
        </button>

        {/* NO button (teleportál) */}
        <button
          onMouseEnter={moveNoButton}
          onClick={moveNoButton}
          className="absolute px-6 py-3 bg-red-400 hover:bg-red-300 text-white font-bold rounded-full shadow-lg transition-all duration-300"
          style={{
            left: noPos.x,
            top: noPos.y,
          }}
        >
          Nem 😈
        </button>

      </div>
    </main>
  );
}