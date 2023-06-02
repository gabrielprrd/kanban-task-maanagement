import { inferAsyncReturnType } from '@trpc/server'
import { dbClient } from '@/config/index'
import { CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getServerSession } from 'next-auth'
import { authOptions as nextAuthOptions } from '../pages/api/auth/[...nextauth]'

export async function createContext(opts?: CreateNextContextOptions) {
  const req = opts?.req
  const res = opts?.res

  const session =
    req && res && (await getServerSession(req, res, nextAuthOptions))

  return {
    session,
    dbClient,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
