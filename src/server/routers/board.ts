import { protectedProcedure, createTRPCRouter } from '../trpc'
import { handleRateLimit } from '../rateLimit'
import {
  BoardDeleteArgsSchema,
  BoardFindUniqueArgsSchema,
  BoardUpsertArgsSchema,
} from '@/models/generated'

export const boardRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.dbClient.board.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        columns: {
          include: {
            tasks: true,
          },
        },
      },
    })
  }),

  getById: protectedProcedure
    .input(BoardFindUniqueArgsSchema)
    .query(async ({ input, ctx }) => {
      return await ctx.dbClient.board.findUnique({
        ...input,
        include: {
          columns: {
            orderBy: {
              order: 'asc',
            },
            include: {
              tasks: {
                include: {
                  subtasks: {
                    orderBy: {
                      order: 'asc',
                    },
                  },
                  column: true,
                },
              },
            },
          },
        },
      })
    }),

  createOrUpdate: protectedProcedure
    .input(BoardUpsertArgsSchema)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.board.upsert({
        ...input,
        include: {
          columns: {
            orderBy: {
              order: 'asc',
            },
            include: {
              tasks: {
                include: {
                  subtasks: {
                    orderBy: {
                      order: 'asc',
                    },
                  },
                  column: true,
                },
              },
            },
          },
        },
      })
    }),

  deleteById: protectedProcedure
    .input(BoardDeleteArgsSchema)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.board.delete(input)
    }),
})
