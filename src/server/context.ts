import { inferAsyncReturnType } from '@trpc/server'
import { dbClient } from '@/config/index'

export function createContext() {
  return {
    dbClient,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
