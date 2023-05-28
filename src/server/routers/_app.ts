import { router } from '../trpc'
import { boardRouter } from './board'
import { taskRouter } from './task'

export const appRouter = router({
  board: boardRouter,
  task: taskRouter,
})
export type AppRouter = typeof appRouter
