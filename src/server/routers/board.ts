import { z } from 'zod'
import { procedure, router } from '../trpc'
import { CreateOrUpdateBoard } from '@/models/index'

const uuid = z.string().uuid().optional()

export const boardRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    const boards = await ctx.dbClient.board.findMany({
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
    return { boards }
  }),

  getById: procedure.input(uuid).query(async ({ input, ctx }) => {
    return await ctx.dbClient.board.findUnique({
      where: {
        id: input,
      },
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

  createOrUpdate: procedure
    .input(CreateOrUpdateBoard)
    .mutation(async ({ input, ctx }) => {
      console.log('BOARD INPUT: ', input)
      return await ctx.dbClient.board.upsert({
        where: {
          id: input.id || '',
        },
        create: {
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
        include: {
          columns: true,
        },
      })
    }),

  deleteById: procedure.input(uuid).mutation(async ({ input, ctx }) => {
    return await ctx.dbClient.board.delete({
      where: {
        id: input,
      },
    })
  }),
})
