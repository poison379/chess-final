'use client';

import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

type Props = {
  fen: string;
  solution: string[];
  autoPlay?: boolean;
};

export default function ChessPuzzleBoard({ fen, solution, autoPlay = false }: Props) {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(fen);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const resetPuzzle = () => {
    const newGame = new Chess();
    newGame.load(fen);
    setGame(newGame);
    setPosition(fen);
    setCurrentMoveIndex(0);
  };

  useEffect(() => {
    resetPuzzle();
  }, [fen]);

  useEffect(() => {
    if (autoPlay && solution.length > 0) {
      const newGame = new Chess(fen);
      setGame(newGame);
      setPosition(fen);
      setCurrentMoveIndex(0);

      solution.forEach((move, index) => {
        setTimeout(() => {
          newGame.move({ from: move.slice(0, 2), to: move.slice(2), promotion: 'q' });
          setGame(new Chess(newGame.fen()));
          setPosition(newGame.fen());
          setCurrentMoveIndex(index + 1);
        }, index * 600);
      });
    }
  }, [autoPlay, solution, fen]);

  const handleMove = (from: string, to: string) => {
    const attempted = `${from}${to}`;
    const expected = solution[currentMoveIndex];

    if (attempted === expected) {
      const move = game.move({ from, to, promotion: 'q' });
      if (move) {
        const newFen = game.fen();
        setGame(new Chess(newFen));
        setPosition(newFen);
        const next = currentMoveIndex + 1;
        setCurrentMoveIndex(next);
        if (next === solution.length) {
          setTimeout(() => alert('✅ Puzzle Solved!'), 100);
        }
      }
    } else {
      setTimeout(() => alert('❌ Incorrect Move! Try again.'), 100);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Chessboard
        id="lichess-puzzle"
        position={position}
        boardWidth={400}
        animationDuration={300}
        onPieceDrop={(from, to) => {
          handleMove(from, to);
          return true;
        }}
      />
      <button
        onClick={resetPuzzle}
        className="mt-2 px-4 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
      >
        🔁 Replay
      </button>
    </div>
  );
}
