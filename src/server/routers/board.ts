import { z } from 'zod'
import { protectedProcedure, createTRPCRouter } from '../trpc'
import { CreateOrUpdateBoard } from '@/models/index'
import { handleRateLimit } from '@/utils/index'

const uuid = z.string().uuid().optional()

export const boardRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const boards = await ctx.dbClient.board.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        name: 'asc',
      },
      select: {
        id: true,
        columns: {
          include: {
            tasks: true,
          },
        },
        name: true,
      },
    })
    return { boards }
  }),

  getById: protectedProcedure.input(uuid).query(async ({ input, ctx }) => {
    return await ctx.dbClient.board.findUnique({
      where: {
        id: input,
      },
      select: {
        id: true,
        name: true,
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
    .input(CreateOrUpdateBoard)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.board.upsert({
        where: {
          id: input.id || '',
        },
        create: {
          userId: ctx.session.user.id,
          name: input.name,
          columns: {
            create: input.columns,
          },
        },
        update: {
          name: input.name,
          columns: {
            deleteMany: {
              boardId: input.id,
              NOT: input.columns?.map((col) => ({ id: col.id })),
            },
            upsert: input.columns?.map((col) => ({
              where: {
                id: col.id || '',
              },
              create: col,
              update: col,
            })),
          },
        },
        select: {
          id: true,
          name: true,
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
    .input(uuid)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.board.delete({
        where: {
          id: input,
        },
      })
    }),
})
