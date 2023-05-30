import { z } from 'zod'

export type SubtaskType = {
  id: string
  title: string
  isComplete: boolean
  order: number
  createdAt?: Date
  updatedAt?: Date
  task: TaskType
}

export const Subtask: z.ZodType<SubtaskType> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  isComplete: z.boolean(),
  order: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  task: z.lazy(() => Task),
})

export const CreateOrUpdateSubtask = z.object({
  title: z.string(),
  id: z.string().uuid().optional(),
  order: z.number(),
  isComplete: z.boolean(),
})

export type TaskType = {
  id: string
  title: string
  description?: string
  subtasks?: SubtaskType[]
  order: number
  createdAt?: Date
  updatedAt?: Date
  column: ColumnType
}

export const Task: z.ZodType<TaskType> = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().optional(),
  subtasks: z.array(Subtask).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  order: z.number(),
  column: z.lazy(() => Column),
})

export const CreateOrUpdateTask = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim(),
  description: z.string().trim(),
  order: z.number(),
  subtasks: z.array(CreateOrUpdateSubtask).optional(),
  column: z.string().uuid(),
})

export type ColumnType = {
  id: string
  name: string
  order: number
  tasks?: TaskType[]
  createdAt?: Date
  updatedAt?: Date
  board: BoardType
}

export const Column: z.ZodType<ColumnType> = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  order: z.number(),
  tasks: z.lazy(() => z.array(Task).optional()),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  board: z.lazy(() => Board),
})

export const CreateOrUpdateColumn = z.object({
  name: z.string().trim(),
  id: z.string().uuid().optional(),
  order: z.number(),
  tasks: z.array(Task).optional(),
})

export type BoardType = {
  id: string
  name: string
  columns?: ColumnType[]
  createdAt?: Date
  updatedAt?: Date
}

export const Board: z.ZodType<BoardType> = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  columns: z.array(Column).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const CreateOrUpdateBoard = z.object({
  name: z.string().trim(),
  id: z.string().uuid().optional(),
  columns: z.array(CreateOrUpdateColumn).optional(),
})

// Validations

export const BoardFormValidation = z.object({
  name: z.string().trim(),
  columns: z.array(z.object({ name: z.string().nonempty() })).optional(),
})

export const SubtaskValidation = z.object({
  title: z.string().trim(),
  id: z.string().uuid().optional(),
})

export const TaskFormValidation = z.object({
  title: z.string().trim(),
  description: z.string().trim().optional(),
  order: z.number().default(0),
  subtasks: z.array(SubtaskValidation).optional(),
  column: z.string().uuid(),
})
