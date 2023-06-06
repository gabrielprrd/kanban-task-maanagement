import { z } from 'zod'

// Form Validations

export const BoardFormValidation = z.object({
  name: z.string().max(20).trim(),
  columns: z.array(z.object({ name: z.string().nonempty() })).optional(),
})

export const SubtaskValidation = z.object({
  title: z.string().max(30).trim(),
  id: z.string().uuid().optional(),
})

export const TaskFormValidation = z.object({
  title: z.string().max(30).trim(),
  description: z.string().max(200).trim().optional(),
  order: z.number().default(0),
  subtasks: z.array(SubtaskValidation).optional(),
  column: z.string().uuid(),
})
