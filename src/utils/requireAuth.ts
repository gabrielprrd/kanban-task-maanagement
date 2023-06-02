import { Session } from 'next-auth'
import { getSession, GetSessionParams } from 'next-auth/react'

export const requireAuth = async (
  context: GetSessionParams,
  cb: (session: Session) => unknown
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return cb(session)
}
