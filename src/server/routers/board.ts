import { z } from 'zod'
import { procedure, router } from '../trpc'
import { CreateOrUpdateBoard } from '@/models/index'

const objectWithIdValidator = z.object({
  id: z.string().uuid().optional(),
})

export const boardRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    const boards = await ctx.dbClient.board.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return { boards }
  }),

  getById: procedure
    .input(objectWithIdValidator)
    .query(async ({ input, ctx }) => {
      return await ctx.dbClient.board.findUnique({
        where: {
          id: input.id,
        },
        include: {
          columns: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      })
    }),

  createOrUpdate: procedure
    .input(CreateOrUpdateBoard)
    .mutation(async ({ input, ctx }) => {
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

  deleteById: procedure
    .input(objectWithIdValidator)
    .mutation(async ({ input, ctx }) => {
      return await ctx.dbClient.board.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
