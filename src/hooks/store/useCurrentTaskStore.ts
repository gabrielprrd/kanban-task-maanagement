import { TaskType } from '@/models/index'
import { create } from 'zustand'

interface CurrentTaskStore {
  task: TaskType | null
  setTask: (task: TaskType) => void
}

export const useCurrentTaskStore = create<CurrentTaskStore>((set) => ({
  task: null,
  setTask: (task) => set({ task }),
}))
