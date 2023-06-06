import { createTRPCRouter } from '../trpc'
import { boardRouter } from './board'
import { taskRouter } from './task'

export const appRouter = createTRPCRouter({
  board: boardRouter,
  task: taskRouter,
})
export type AppRouter = typeof appRouter
