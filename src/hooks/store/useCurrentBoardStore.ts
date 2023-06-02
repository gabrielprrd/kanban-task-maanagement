import { BoardType } from '@/models/index'
import { create } from 'zustand'

interface CurrentBoardStore {
  board: BoardType | null
  setBoard: (board: BoardType | null) => void
}

export const useCurrentBoardStore = create<CurrentBoardStore>((set) => ({
  board: null,
  setBoard: (board) => set({ board }),
}))
