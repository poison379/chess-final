"use client"

import { useState } from "react"
import type { Puzzle } from "@/types/puzzle"
import PuzzleCard from "./puzzle-card"
import PuzzleModal from "./puzzle-modal"

interface PuzzleGridProps {
  puzzles: Puzzle[]
}

export default function PuzzleGrid({ puzzles }: PuzzleGridProps) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<Puzzle | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {puzzles.map((puzzle) => (
          <PuzzleCard key={puzzle.id} puzzle={puzzle} onClick={() => setSelectedPuzzle(puzzle)} />
        ))}
      </div>

      {selectedPuzzle && <PuzzleModal puzzle={selectedPuzzle} onClose={() => setSelectedPuzzle(null)} />}
    </>
  )
}
