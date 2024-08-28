import {create} from 'zustand'
import {initialState, type GameState} from './initialState'

type GameStore = {
  game: GameState
  resetGame: () => void
  setGame: (game: GameState) => void
  setDiceNo: (diceNo: number) => void
  setChancePlayer: (chancePlayer: number) => void
  setIsDiceRolled: (isDiceRolled: boolean) => void
  enableCellSelection: (player: number) => void
  disableTouch: () => void
  enableTouch: () => void
  updateFirework: (firework: boolean) => void
  announceWinner: (winner: number) => void
  updatePlayerChance: (player: number) => void
  enablePileSelection: (player: number) => void
}
const gameStore = create<GameStore>((set) => ({
  game: initialState,
  resetGame: () => set({game: initialState}),
  setGame: (game) => set({game}),
  setDiceNo: (diceNo) => set((state) => ({game: {...state.game, diceNo}})),
  setChancePlayer: (chancePlayer) => set((state) => ({game: {...state.game, chancePlayer}})),
  setIsDiceRolled: (isDiceRolled) => set((state) => ({game: {...state.game, isDiceRolled}})),
  enableCellSelection: (player) => set((state) => ({game: {...state.game, touchDisabled: true, cellSelectionPlayer: player}})),
  disableTouch: () => set((state) => ({game: {...state.game, touchDisabled: true, cellSelectionPlayer: -1, pileSelectionPlayer: -1}})),
  enableTouch: () => set((state) => ({game: {...state.game, touchDisabled: false, isDiceRolled: true}})),
  updateFirework: (firework) => set((state) => ({game: {...state.game, firework}})),
  announceWinner: (winner) => set((state) => ({game: {...state.game, winner}})),
  updatePlayerChance: (player) => set((state) => ({game: {...state.game, chancePlayer: player}})),
  enablePileSelection: (player) => set((state) => ({game: {...state.game, touchDisabled: true, pileSelectionPlayer: player}})),
}))

export default gameStore
