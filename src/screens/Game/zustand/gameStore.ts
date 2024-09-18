import type {PlayerTournamentRoom} from '@query/api'
import {create} from 'zustand'

export type Num = 0 | 1 | 2 | 3 | -1

type GameStore = {
  isDiceRolling: boolean
  isDiceRolled: boolean
  isTouchDisabled: boolean
  winner: null | Num
  diceNumber: number
  chancePlayer: Num
  tokenSelection: Num
  cellSelection: Num
  // currentPositions: PlayerState[]
  fireWorks: boolean
  points: number[]
  myId: Num
  playersData: PlayerTournamentRoom[]
  setPlayersData: (playersData: PlayerTournamentRoom[]) => void
  setMyId: (id: Num) => void
  setIsDiceRolling: (isDiceRolling: boolean) => void
  setIsDiceRolled: (isDiceRolled: boolean) => void
  setIsTouchDisabled: (isTouchDisabled: boolean) => void
  setWinner: (winner: null | Num) => void
  setDiceNumber: (diceNumber: number) => void
  setChancePlayer: (chancePlayer: Num) => void
  // updateCurrentPositions: (currentPositions: PlayerState[]) => void
  enableTokenSelection: (player: Num) => void
  enableCellSelection: (player: Num) => void
  disableTouch: () => void
  updateFireWorks: (fireWorks: boolean) => void
  unfreezeDice: () => void
  // updatePlayerPiece: (player: Num, pieceId: string, position: number, travelCount: number) => void
}
const gameStore = create<GameStore>((set) => ({
  chancePlayer: 3,
  isDiceRolled: false,
  tokenSelection: -1,
  cellSelection: -1,
  isDiceRolling: false,
  isTouchDisabled: false,
  winner: null,
  diceNumber: 1,
  // currentPositions: [...player0InitialState, ...player2InitialState, ...player3InitialState, ...player4InitialState],
  // currentPositions: [],
  fireWorks: false,
  points: [0, 0, 0, 0],
  myId: -1,
  playersData: [],
  setPlayersData: (playersData) => set({playersData}),
  setMyId: (id) => set({myId: id}),
  setIsDiceRolling: (isDiceRolling) => set({isDiceRolling}),
  setIsTouchDisabled: (isTouchDisabled) => set({isTouchDisabled}),
  setWinner: (winner) => set({winner}),
  setDiceNumber: (diceNumber) => set({diceNumber}),
  setChancePlayer,
  setIsDiceRolled: (isDiceRolled) => set({isDiceRolled}),
  // updateCurrentPositions: (currentPositions) => set({currentPositions}),
  enableTokenSelection: enableTokenSelection,
  enableCellSelection: enableCellSelection,
  disableTouch,
  unfreezeDice,
  updateFireWorks,
  // updatePlayerPiece,
}))

function setChancePlayer(chancePlayer: Num) {
  gameStore.setState({chancePlayer})
  gameStore.setState({isTouchDisabled: false})
  gameStore.setState({isDiceRolled: false})
}

function enableTokenSelection(player: Num) {
  gameStore.setState({isTouchDisabled: true})
  gameStore.setState({tokenSelection: player})
}

function enableCellSelection(player: Num) {
  gameStore.setState({isTouchDisabled: true})
  gameStore.setState({cellSelection: player})
}

function disableTouch() {
  gameStore.setState({isTouchDisabled: true})
  gameStore.setState({tokenSelection: -1})
  gameStore.setState({cellSelection: -1})
}

function unfreezeDice() {
  gameStore.setState({isTouchDisabled: false})
  gameStore.setState({isDiceRolled: false})
}

function updateFireWorks(fireWorks: boolean) {
  gameStore.setState({fireWorks})
}

export default gameStore
