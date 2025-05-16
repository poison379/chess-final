"use client"

import type { Puzzle } from "@/types/puzzle"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Users } from "lucide-react"
import MiniChessboard from "./mini-chessboard"

interface PuzzleCardProps {
  puzzle: Puzzle
  onClick: () => void
}

export default function PuzzleCard({ puzzle, onClick }: PuzzleCardProps) {
  // Map difficulty to color
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
  }[puzzle.difficulty]

  // For the featured puzzle, highlight the square from the image (d3 for the queen)
  const highlightedSquare = puzzle.featured ? "d3" : undefined

  return (
    <Card className={`h-full hover:shadow-md transition-shadow ${puzzle.featured ? "ring-2 ring-yellow-400" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <Badge className={`${difficultyColor} font-medium`}>{puzzle.difficulty}</Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{puzzle.plays.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-4 border border-gray-200 rounded shadow-sm overflow-hidden">
          <MiniChessboard position={puzzle.position} highlightedSquare={highlightedSquare} />
        </div>

        <div className="text-sm text-gray-600">
          <p>Moves: {puzzle.moves.length}</p>
          {puzzle.featured && <p className="text-yellow-600 font-medium mt-1">Featured Puzzle</p>}
        </div>
      </CardContent>

      <CardFooter>
        <Button onClick={onClick} className="w-full" variant="outline">
          View Puzzle
        </Button>
      </CardFooter>
    </Card>
  )
}
