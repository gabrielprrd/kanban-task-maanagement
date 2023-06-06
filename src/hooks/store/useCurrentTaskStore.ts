import { TaskWithRelations } from '@/models/generated'
import { create } from 'zustand'

interface CurrentTaskStore {
  task: TaskWithRelations | null
  setTask: (task: TaskWithRelations | null) => void
}

export const useCurrentTaskStore = create<CurrentTaskStore>((set) => ({
  task: null,
  setTask: (task) => set({ task }),
}))
