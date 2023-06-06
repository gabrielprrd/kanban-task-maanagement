import { BoardWithRelations } from '@/models/generated'
import { create } from 'zustand'

interface CurrentBoardStore {
  board: BoardWithRelations | null
  setBoard: (board: BoardWithRelations | null) => void
}

export const useCurrentBoardStore = create<CurrentBoardStore>((set) => ({
  board: null,
  setBoard: (board) => set({ board }),
}))
