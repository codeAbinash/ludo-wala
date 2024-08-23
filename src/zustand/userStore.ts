import type {User} from '@query/api'
import {create} from 'zustand'

type UserS = {
  user: User | null
  setUser: (user: User | null) => void
}

export const userStore = create<UserS>((set) => ({
  user: null,
  setUser: (user) => set({user}),
}))
