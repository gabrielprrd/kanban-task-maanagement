import { create } from 'zustand'

interface BoardFormStore {
  isBoardFormOpen: boolean
  openBoardForm: () => void
  closeBoardForm: () => void
  formMode: 'create' | 'edit',
  setFormMode: (formMode: 'create' | 'edit') => void
  openCreateBoardForm: () => void
  openEditBoardForm: () => void
}

export const useBoardFormStore = create<BoardFormStore>((set, get) => ({
  isBoardFormOpen: false,
  openBoardForm: () => set({ isBoardFormOpen: true }),
  closeBoardForm: () => set({ isBoardFormOpen: false }),
  formMode: 'create',
  setFormMode: (formMode) => set({ formMode }),
  openCreateBoardForm: () => {
    get().setFormMode('create')
    get().openBoardForm()
  },
  openEditBoardForm: () => {
    get().setFormMode('edit')
    get().openBoardForm()
  }
}))

