import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { type GetServerSidePropsContext } from 'next'
import { getServerSession, type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req']
  res: GetServerSidePropsContext['res']
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
