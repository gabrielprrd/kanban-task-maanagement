import { create } from 'zustand'
interface TaskFormStore {
  isTaskFormOpen: boolean
  openTaskForm: () => void
  closeTaskForm: () => void
  formMode: 'create' | 'edit'
  setFormMode: (formMode: 'create' | 'edit') => void
  openCreateTaskForm: () => void
  openEditTaskForm: () => void
}

export const useTaskFormStore = create<TaskFormStore>((set, get) => ({
  isTaskFormOpen: false,
  openTaskForm: () => set({ isTaskFormOpen: true }),
  closeTaskForm: () => set({ isTaskFormOpen: false }),
  formMode: 'create',
  setFormMode: (formMode) => set({ formMode }),
  openCreateTaskForm: () => {
    get().setFormMode('create')
    get().openTaskForm()
  },
  openEditTaskForm: () => {
    get().setFormMode('edit')
    get().openTaskForm()
  },
}))
