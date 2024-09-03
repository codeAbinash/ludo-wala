import type {Num} from './gameStore'

export type PlayerState = {
  pos: number
  travelCount: number
  id: string
  player: Num
}

export const player0InitialState: PlayerState[] = [
  {
    pos: 14,
    travelCount: 0,
    id: 'A1',
    player: 0,
  },
  {
    pos: 14,
    travelCount: 0,
    id: 'A2',
    player: 0,
  },
  {
    pos: 14,
    travelCount: 0,
    id: 'A3',
    player: 0,
  },
  {
    pos: 14,
    travelCount: 0,
    id: 'A4',
    player: 0,
  },
]

export const player2InitialState: PlayerState[] = [
  {
    pos: 27,
    travelCount: 0,
    id: 'B1',
    player: 1,
  },
  {
    pos: 27,
    travelCount: 0,
    id: 'B2',
    player: 1,
  },
  {
    pos: 27,
    travelCount: 0,
    id: 'B3',
    player: 1,
  },
  {
    pos: 27,
    travelCount: 0,
    id: 'B4',
    player: 1,
  },
]

export const player3InitialState: PlayerState[] = [
  {
    pos: 40,
    travelCount: 0,
    id: 'C1',
    player: 2,
  },
  {
    pos: 40,
    travelCount: 0,
    id: 'C2',
    player: 2,
  },
  {
    pos: 40,
    travelCount: 0,
    id: 'C3',
    player: 2,
  },
  {
    pos: 40,
    travelCount: 0,
    id: 'C4',
    player: 2,
  },
]
export const player4InitialState: PlayerState[] = [
  {
    pos: 1,
    travelCount: 0,
    id: 'D1',
    player: 3,
  },
  {
    pos: 1,
    travelCount: 0,
    id: 'D2',
    player: 3,
  },
  {
    pos: 1,
    travelCount: 0,
    id: 'D3',
    player: 3,
  },
  {
    pos: 1,
    travelCount: 0,
    id: 'D4',
    player: 3,
  },
]
