'use client';

import { useState } from 'react';
import ChessPuzzleBoard from '@/components/chessboard';

const puzzles = [
  {
  name: "Paul Morphy's Opera Game",
  fen: "rnbqkbnr/pppp1ppp/8/4p3/3PP3/5N2/PPP2PPP/RNBQK2R w KQkq - 2 4",
  solution: ["e5d4", "f3d4", "g8f6", "b1c3", "f8c5", "c1e3", "c5b4", "d1d3", "b4c3", "e1c1"],
  difficulty: "Easy",
  rating: 1400
},
  {
    name: "The Evergreen Game",
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 4 4",
    solution: ["d4e5", "f6e4", "f1c4", "f8c5", "d1d5", "e4f2", "d5f7"],
    difficulty: "Medium",
    rating: 1600
  },
  {
    name: "The Immortal Game",
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/1P6/P1N2N2/2PPPPPP/R1BQKB1R b KQkq - 0 3",
    solution: ["e5e4", "f3g5", "d7d5", "d2d3", "h7h6", "g5e4", "f6e4", "d3e4", "d5e4", "d1d8", "e8d8", "c1g5"],
    difficulty: "Hard",
    rating: 1800
  }
];

export default function HomePage() {
  const [replayKeys, setReplayKeys] = useState(puzzles.map(() => 0));

  const handleReplay = (index: number) => {
    setReplayKeys(prev => {
      const updated = [...prev];
      updated[index] += 1;
      return updated;
    });
  };

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold mb-4">Famous Chess Puzzles</h1>
      <p className="text-muted-foreground mb-10">
        Watch and learn from iconic games in chess history.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {puzzles.map((puzzle, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">{puzzle.name}</h2>
            <ChessPuzzleBoard
              key={replayKeys[index]}
              fen={puzzle.fen}
              solution={puzzle.solution}
            />
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>🎯 {puzzle.difficulty}</span>
              <span>⭐ {puzzle.rating}</span>
            </div>
            <button
              onClick={() => handleReplay(index)}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Replay
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
