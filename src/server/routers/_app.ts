import { router } from '../trpc'
import { boardRouter } from './board'

export const appRouter = router({
  board: boardRouter,
})
export type AppRouter = typeof appRouter
