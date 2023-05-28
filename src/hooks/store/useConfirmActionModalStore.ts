import { create } from 'zustand'

interface ConfirmActionModalStore {
  isConfirmActionModalOpen: boolean
  title: string
  setTitle: (title: string) => void
  description: string
  setDescription: (description: string) => void
  confirmBtnLabel: string
  setConfirmBtnLabel: (confirmBtlLabel: string) => void
  confirmCallback: () => unknown
  setConfirmCallback: (confirmCallback: () => unknown) => unknown
  openConfirmActionModal: () => void
  closeConfirmActionModal: () => void
}

export const useConfirmActionModalStore = create<ConfirmActionModalStore>(set => ({
  isConfirmActionModalOpen: false,
  title: "",
  setTitle: (title) => set({ title }),
  description: "",
  setDescription: (description) => set({ description }),
  confirmBtnLabel: "",
  setConfirmBtnLabel: (confirmBtnLabel) => set({ confirmBtnLabel }),
  confirmCallback: () => null,
  setConfirmCallback: (confirmCallback) => set({ confirmCallback }),
  openConfirmActionModal: () => set({ isConfirmActionModalOpen: true }),
  closeConfirmActionModal: () => set({ isConfirmActionModalOpen: false }),
}))
