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
                subtasks: true,
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
      console.log('query input: ', input)

      return await ctx.dbClient.board.upsert({
        create: {
          name: input.name,
          columns: {
            create: input.columns,
          },
        },
        where: {
          id: input.id || '',
        },
        update: {
          name: input.name,
          columns: {
            upsert: input.columns?.map((col) => ({
              create: col, // This "create" doesn't work for now
              where: {
                id: col.id || '',
              },
              update: col,
            })),
            deleteMany: {
              boardId: input.id,
              NOT: input.columns?.map((col) => ({ id: col.id })),
            },
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
