import {create} from 'zustand'
import {
  player0InitialState,
  player2InitialState,
  player3InitialState,
  player4InitialState,
  type PlayerState,
} from './initialState'

export type Num = 0 | 1 | 2 | 3 | -1

type GameStore = {
  player0: PlayerState[]
  setPlayer0: (player1: PlayerState[]) => void
  player1: PlayerState[]
  setPlayer1: (player2: PlayerState[]) => void
  player2: PlayerState[]
  setPlayer2: (player3: PlayerState[]) => void
  player3: PlayerState[]
  setPlayer3: (player4: PlayerState[]) => void
  isDiceRolling: boolean
  isDiceRolled: boolean
  isTouchDisabled: boolean
  winner: null | Num
  diceNumber: number
  chancePlayer: Num
  setIsDiceRolling: (isDiceRolling: boolean) => void
  setIsDiceRolled: (isDiceRolled: boolean) => void
  setIsTouchDisabled: (isTouchDisabled: boolean) => void
  setWinner: (winner: null | Num) => void
  setDiceNumber: (diceNumber: number) => void
  setChancePlayer: (chancePlayer: Num) => void
  pileSelectionEnabled: boolean
  setPileSelectionEnabled: (pileSelectionEnabled: boolean) => void
  currentPositions: PlayerState[]
  updateCurrentPositions: (currentPositions: PlayerState[]) => void
}
const gameStore = create<GameStore>((set) => ({
  player0: player0InitialState,
  setPlayer0: (player0) => set({player0}),
  player1: player2InitialState,
  setPlayer1: (player1) => set({player1}),
  player2: player3InitialState,
  setPlayer2: (player2) => set({player2}),
  player3: player4InitialState,
  setPlayer3: (player3) => set({player3}),
  isDiceRolling: false,
  isTouchDisabled: false,
  winner: null,
  diceNumber: 1,
  setIsDiceRolling: (isDiceRolling) => set({isDiceRolling}),
  setIsTouchDisabled: (isTouchDisabled) => set({isTouchDisabled}),
  setWinner: (winner) => set({winner}),
  setDiceNumber: (diceNumber) => set({diceNumber}),
  chancePlayer: 0,
  setChancePlayer: (chancePlayer) => set({chancePlayer}),
  isDiceRolled: false,
  setIsDiceRolled: (isDiceRolled) => set({isDiceRolled}),
  pileSelectionEnabled: false,
  setPileSelectionEnabled: (pileSelectionEnabled) => set({pileSelectionEnabled}),
  currentPositions: [...player0InitialState, ...player2InitialState, ...player3InitialState, ...player4InitialState],
  updateCurrentPositions: (currentPositions) => set({currentPositions}),
}))

export default gameStore
