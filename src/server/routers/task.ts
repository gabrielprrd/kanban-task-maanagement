import { z } from 'zod'
import { protectedProcedure, createTRPCRouter } from '../trpc'
import { CreateOrUpdateTask } from '@/models/index'
import { handleRateLimit } from '../rateLimit'

const uuid = z.string().uuid().optional()

export const taskRouter = createTRPCRouter({
  getById: protectedProcedure.input(uuid).query(async ({ input, ctx }) => {
    return await ctx.dbClient.task.findUnique({
      where: {
        id: input,
      },
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
    .input(CreateOrUpdateTask)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.task.upsert({
        create: {
          title: input.title,
          description: input.description,
          order: input.order,
          subtasks: {
            create: input.subtasks,
          },
          column: {
            connect: {
              id: input.column,
            },
          },
        },
        where: {
          id: input.id || '',
        },
        update: {
          title: input.title,
          description: input.description,
          order: input.order,
          subtasks: {
            deleteMany: {
              taskId: input.id,
              NOT: input.subtasks?.map((col) => ({ id: col.id })),
            },
            upsert: input.subtasks?.map((sub) => ({
              create: sub,
              where: {
                id: sub.id || '',
              },
              update: sub,
            })),
          },
          column: {
            connect: {
              id: input.column,
            },
          },
        },
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
    .input(uuid)
    .mutation(async ({ input, ctx }) => {
      handleRateLimit(ctx.session.user.id)

      return await ctx.dbClient.task.delete({
        where: {
          id: input,
        },
      })
    }),
})
