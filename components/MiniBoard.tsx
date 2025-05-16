'use client';
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';

type Props = {
  fen: string;
  className?: string;
};

const pieceToImage: Record<string, string> = {
  p: 'bp', n: 'bn', b: 'bb', r: 'br', q: 'bq', k: 'bk',
  P: 'wp', N: 'wn', B: 'wb', R: 'wr', Q: 'wq', K: 'wk',
};

export default function MiniBoard({ fen, className = '' }: Props) {
  const [board, setBoard] = useState<string[][]>([]);

  useEffect(() => {
    const rows = fen.split(' ')[0].split('/');
    const boardArray: string[][] = [];

    rows.forEach((row) => {
      const rowArray: string[] = [];
      for (const char of row) {
        if (isNaN(Number(char))) {
          rowArray.push(char);
        } else {
          rowArray.push(...Array(Number(char)).fill(''));
        }
      }
      boardArray.push(rowArray);
    });

    setBoard(boardArray);
  }, [fen]);

  return (
    <div
      className={`grid grid-cols-8 w-32 h-32 border border-gray-300 rounded overflow-hidden ${className}`}
      style={{ aspectRatio: '1/1' }}
    >
      {board.map((row, rowIndex) =>
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const bg = isLight ? 'bg-[#f0d9b5]' : 'bg-[#b58863]';
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${bg} flex items-center justify-center`}
            >
              {piece && (
                <img
                  src={`/pieces/${pieceToImage[piece]}.svg`}
                  alt={piece}
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
