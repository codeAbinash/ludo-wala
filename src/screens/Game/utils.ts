import type { PlayerState } from './zustand/initialState'


export function isMovePossible(currentPositions: PlayerState[], newDiceNo: number, player: number) {
  return currentPositions.findIndex((t) => t.travelCount + newDiceNo <= 57 && t.player === player) !== -1
}
