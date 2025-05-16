'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface MiniChessboardProps {
  position: string; // FEN notation
  className?: string;
  highlightedSquare?: string;
}

const pieceMap: Record<string, string> = {
  P: '/pieces/wp.svg',
  N: '/pieces/wn.svg',
  B: '/pieces/wb.svg',
  R: '/pieces/wr.svg',
  Q: '/pieces/wq.svg',
  K: '/pieces/wk.svg',
  p: '/pieces/bp.svg',
  n: '/pieces/bn.svg',
  b: '/pieces/bb.svg',
  r: '/pieces/br.svg',
  q: '/pieces/bq.svg',
  k: '/pieces/bk.svg',
};

export default function MiniChessboard({
  position,
  className = '',
  highlightedSquare,
}: MiniChessboardProps) {
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    if (!position || typeof position !== 'string') return;
    const fenParts = position.split(' ');
    const rows = fenParts[0].split('/');
    const boardArray: string[][] = [];

    rows.forEach((row) => {
      const boardRow: string[] = [];
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        if (isNaN(Number(char))) {
          boardRow.push(char);
        } else {
          for (let j = 0; j < Number(char); j++) {
            boardRow.push('');
          }
        }
      }
      boardArray.push(boardRow);
    });

    setBoard(boardArray);
  }, [position]);

  return (
    <div
      className={clsx(
        'grid grid-cols-8 aspect-square w-40 rounded overflow-hidden border border-gray-300 shadow',
        className
      )}
    >
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const squareColor = (rowIndex + colIndex) % 2 === 0 ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
          const squareIndex = `${String.fromCharCode(97 + colIndex)}${8 - rowIndex}`;
          const isHighlighted = squareIndex === highlightedSquare;

          return (
            <div
              key={squareIndex}
              className={clsx(
                'relative w-full h-full flex items-center justify-center',
                squareColor,
                isHighlighted && 'ring-2 ring-yellow-400 z-10'
              )}
            >
              {square && (
                <img
                  src={pieceMap[square]}
                  alt={square}
                  className="w-4/5 h-4/5 object-contain"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
