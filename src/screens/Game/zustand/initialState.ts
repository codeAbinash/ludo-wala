const player1InitialState: PlayerState[] = [
  {id: 'A1', pos: 0, travelCount: 0},
  {id: 'A2', pos: 0, travelCount: 0},
  {id: 'A3', pos: 0, travelCount: 0},
  {id: 'A4', pos: 0, travelCount: 0},
]

const player2InitialState: PlayerState[] = [
  {id: 'B1', pos: 0, travelCount: 0},
  {id: 'B2', pos: 0, travelCount: 0},
  {id: 'B3', pos: 0, travelCount: 0},
  {id: 'B4', pos: 0, travelCount: 0},
]

const player3InitialState: PlayerState[] = [
  {id: 'C1', pos: 0, travelCount: 0},
  {id: 'C2', pos: 0, travelCount: 0},
  {id: 'C3', pos: 0, travelCount: 0},
  {id: 'C4', pos: 0, travelCount: 0},
]

const player4InitialState: PlayerState[] = [
  {id: 'D1', pos: 0, travelCount: 0},
  {id: 'D2', pos: 0, travelCount: 0},
  {id: 'D3', pos: 0, travelCount: 0},
  {id: 'D4', pos: 0, travelCount: 0},
]

export const initialState: GameState = {
  player1: player1InitialState,
  player2: player2InitialState,
  player3: player3InitialState,
  player4: player4InitialState,
  chancePlayer: 1,
  diceNo: 1,
  isDiceRolled: false,
  pileSelectionPlayer: -1,
  cellSelectionPlayer: -1,
  touchDisabled: false,
  currentPositions: [],
  firework: false,
  winner: null,
}

export type PlayerState = {
  id: string
  pos: number
  travelCount: number
}

export type GameState = {
  player1: PlayerState[]
  player2: PlayerState[]
  player3: PlayerState[]
  player4: PlayerState[]
  chancePlayer: number
  diceNo: number
  isDiceRolled: boolean
  pileSelectionPlayer: number
  cellSelectionPlayer: number
  touchDisabled: boolean
  currentPositions: number[]
  firework: boolean
  winner: number | null
}
