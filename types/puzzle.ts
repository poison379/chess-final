export interface Puzzle {
  id: string
  difficulty: "Easy" | "Medium" | "Hard"
  plays: number
  position: string // FEN notation
  moves: string[] // List of moves in algebraic notation
  featured?: boolean
}
