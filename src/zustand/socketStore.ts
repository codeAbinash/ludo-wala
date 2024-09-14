import type {Socket} from 'socket.io-client'
import {create} from 'zustand'

type SocketStore = {
  socket: Socket | null
  isConnected: boolean
  setSocket: (socket: Socket | null) => void
}

export const socketStore = create<SocketStore>((set) => ({
  socket: null,
  isConnected: false,
  setSocket: (socket) => set({socket}),
}))
