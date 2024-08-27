import {create} from 'zustand'
import {initialState, type GameState} from './initialState'

type GameStore = {
  game: GameState
  resetGame: () => void
}
const gameStore = create<GameStore>((set) => ({
  game: initialState,
  resetGame: () => set({game: initialState}),
}))

export default gameStore
