import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import type { AppRouter } from '../server/routers/_app'
import { isServer } from './isServer'
import superjson from 'superjson'

function getBaseUrl() {
  if (!isServer)
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return process.env.NEXT_PUBLIC_BACKEND_URL
}

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      abortOnUnmount: true,
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
})
