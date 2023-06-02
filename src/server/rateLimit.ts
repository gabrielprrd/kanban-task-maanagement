import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { TRPCError } from '@trpc/server'

// Create a new ratelimiter, that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

export async function handleRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier)

  if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
}
