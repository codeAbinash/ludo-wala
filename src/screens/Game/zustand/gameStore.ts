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
  player1: PlayerState[]
  player2: PlayerState[]
  player3: PlayerState[]
  isDiceRolling: boolean
  isDiceRolled: boolean
  isTouchDisabled: boolean
  winner: null | Num
  diceNumber: number
  chancePlayer: Num
  tokenSelection: Num
  cellSelection: Num
  currentPositions: PlayerState[]
  fireWorks: boolean
  setPlayer0: (player1: PlayerState[]) => void
  setPlayer1: (player2: PlayerState[]) => void
  setPlayer2: (player3: PlayerState[]) => void
  setPlayer3: (player4: PlayerState[]) => void
  setIsDiceRolling: (isDiceRolling: boolean) => void
  setIsDiceRolled: (isDiceRolled: boolean) => void
  setIsTouchDisabled: (isTouchDisabled: boolean) => void
  setWinner: (winner: null | Num) => void
  setDiceNumber: (diceNumber: number) => void
  setChancePlayer: (chancePlayer: Num) => void
  updateCurrentPositions: (currentPositions: PlayerState[]) => void
  enableTokenSelection: (player: Num) => void
  enableCellSelection: (player: Num) => void
  disableTouch: () => void
  updateFireWorks: (fireWorks: boolean) => void
  unfreezeDice: () => void
  // updatePlayerPiece: (player: Num, pieceId: string, position: number, travelCount: number) => void
}
const gameStore = create<GameStore>((set) => ({
  player0: player0InitialState,
  player1: player2InitialState,
  player2: player3InitialState,
  player3: player4InitialState,
  chancePlayer: 0,
  isDiceRolled: false,
  tokenSelection: -1,
  cellSelection: -1,
  isDiceRolling: false,
  isTouchDisabled: false,
  winner: null,
  diceNumber: 1,
  currentPositions: [...player0InitialState, ...player2InitialState, ...player3InitialState, ...player4InitialState],
  fireWorks: false,
  setPlayer0: (player0) => set({player0}),
  setPlayer1: (player1) => set({player1}),
  setPlayer2: (player2) => set({player2}),
  setPlayer3: (player3) => set({player3}),
  setIsDiceRolling: (isDiceRolling) => set({isDiceRolling}),
  setIsTouchDisabled: (isTouchDisabled) => set({isTouchDisabled}),
  setWinner: (winner) => set({winner}),
  setDiceNumber: (diceNumber) => set({diceNumber}),
  setChancePlayer,
  setIsDiceRolled: (isDiceRolled) => set({isDiceRolled}),
  updateCurrentPositions: (currentPositions) => set({currentPositions}),
  enableTokenSelection: enablePieceSelection,
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

function enablePieceSelection(player: Num) {
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
