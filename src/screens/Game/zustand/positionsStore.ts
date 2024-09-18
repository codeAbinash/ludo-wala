import {create} from 'zustand'
import type {PlayerState} from './initialState'

type PositionsStore = {
  currentPositions: PlayerState[]
  updateCurrentPositions: (currentPositions: PlayerState[]) => void
}

const positionsStore = create<PositionsStore>((set) => ({
  currentPositions: [],
  updateCurrentPositions(currentPositions) {
    set({currentPositions})
  },
}))

export default positionsStore
