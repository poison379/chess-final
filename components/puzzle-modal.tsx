"use client"

import { useState } from "react"
import type { Puzzle } from "@/types/puzzle"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Chessboard from "./chessboard"
import { ArrowRight } from "lucide-react"

interface PuzzleModalProps {
  puzzle: Puzzle
  onClose: () => void
}

export default function PuzzleModal({ puzzle, onClose }: PuzzleModalProps) {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  // Extract the target square from the move notation (simplified)
  const getTargetSquare = (move: string) => {
    // This is a simplified version - in a real app, you'd need proper chess move parsing
    // For example, "e4" would highlight e4, "Nf3" would highlight f3
    if (move.length >= 2) {
      const lastTwoChars = move.slice(-2)
      if (lastTwoChars.match(/[a-h][1-8]/)) {
        return lastTwoChars
      }
    }
    return null
  }

  const currentHighlight = currentMoveIndex > 0 ? getTargetSquare(puzzle.moves[currentMoveIndex - 1]) : null

  const handleNextMove = () => {
    if (currentMoveIndex < puzzle.moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1)
    } else {
      setShowSolution(true)
    }
  }

  const resetPuzzle = () => {
    setCurrentMoveIndex(0)
    setShowSolution(false)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Chess Puzzle #{puzzle.id}</DialogTitle>
            <Badge className="ml-2">{puzzle.difficulty}</Badge>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-5 gap-4 my-4">
          <div className="md:col-span-3">
            <Chessboard position={puzzle.position} highlightedSquare={currentHighlight} />
          </div>

          <div className="md:col-span-2">
            <div className="border rounded-md p-4 h-full">
              <h3 className="font-medium mb-2">Move List</h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {puzzle.moves.map((move, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${index <= currentMoveIndex ? "bg-gray-100" : ""} ${!showSolution && index > currentMoveIndex ? "opacity-0" : ""}`}
                  >
                    <span className="font-mono mr-2">
                      {Math.floor(index / 2) + 1}.{index % 2 === 0 ? "" : ".."}
                    </span>
                    {move}
                  </div>
                ))}

                {!showSolution && (
                  <div className="p-2 rounded bg-gray-100 text-gray-500 italic">Continue to see the solution...</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={resetPuzzle}>
            Reset Puzzle
          </Button>

          <Button onClick={handleNextMove} disabled={showSolution} className="sm:ml-auto">
            {showSolution ? "Completed" : "Next Move"}
            {!showSolution && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
