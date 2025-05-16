'use client';

import { useState } from 'react';
import ChessPuzzleBoard from '@/components/chessboard';

const puzzles = [
  {
    id: 'puzzle1',
    fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4',
    solution: ['f3g5', 'd7d5', 'c4d5']
  },
  {
    id: 'puzzle2',
    fen: '6rk/p3p2p/5pbQ/1B6/Pn1Pp3/1Pq5/2P2PP1/1KR4R b - - 1 1',
    solution: ['e4e3', 'h6g6', 'g8g6']
  },
  {
    id: 'puzzle3',
    fen: '8/5k2/6R1/1r3p2/5P2/1P6/8/6K1 w - - 0 1',
    solution: ['g6g5', 'f7f6']
  }
];

export default function Home() {
  const [autoPlayStates, setAutoPlayStates] = useState<Record<string, boolean>>({});

  const triggerAutoPlay = (id: string) => {
    setAutoPlayStates((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAutoPlayStates((prev) => ({ ...prev, [id]: false }));
    }, 1000); // Reset after 1 second for reuse
  };

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">Practice Puzzles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {puzzles.map((puzzle) => (
          <div key={puzzle.id} className="flex flex-col items-center">
            <ChessPuzzleBoard
              fen={puzzle.fen}
              solution={puzzle.solution}
              autoPlay={autoPlayStates[puzzle.id]}
            />
            <button
              onClick={() => triggerAutoPlay(puzzle.id)}
              className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              ▶️ Play Puzzle
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
