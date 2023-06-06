import { protectedProcedure, createTRPCRouter } from '../trpc'
import { handleRateLimit } from '../rateLimit'
import {
  TaskDeleteArgsSchema,
  TaskFindUniqueArgsSchema,
  TaskUpdateArgsSchema,
  TaskUpsertArgsSchema,
} from '@/models/generated'

export const taskRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(TaskFindUniqueArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.dbClient.task.findUnique({
        ...input,
        include: {
          subtasks: {
            orderBy: {
              order: 'asc',
            },
          },
          column: true,
        },
      })
    }),

  update: protectedProcedure
    .input(TaskUpdateArgsSchema)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.task.update({
        ...input,
        include: {
          subtasks: {
            orderBy: {
              order: 'asc',
            },
          },
          column: true,
        },
      })
    }),

  createOrUpdate: protectedProcedure
    .input(TaskUpsertArgsSchema)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.task.upsert({
        ...input,
        include: {
          subtasks: {
            orderBy: {
              order: 'asc',
            },
          },
          column: true,
        },
      })
    }),

  deleteById: protectedProcedure
    .input(TaskDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.task.delete({
        ...input,
      })
    }),
})
