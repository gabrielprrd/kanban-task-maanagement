import { z } from 'zod'
import { procedure, router } from '../trpc'
import { CreateOrUpdateTask } from '@/models/index'

const objectWithIdValidator = z.object({
  id: z.string().uuid().optional(),
})

export const taskRouter = router({
  getById: procedure
    .input(objectWithIdValidator)
    .query(async ({ input, ctx }) => {
      return await ctx.dbClient.task.findUnique({
        where: {
          id: input.id,
        },
        include: {
          subtasks: true,
          column: true,
        },
      })
    }),

  createOrUpdate: procedure
    .input(CreateOrUpdateTask)
    .mutation(async ({ input, ctx }) => {
      console.log('=== TASK INPUT: ', input)
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
            upsert: input.subtasks?.map((sub) => ({
              create: sub, // This "create" doesn't work for now
              where: {
                id: sub.id || '',
              },
              update: sub,
            })),
            deleteMany: {
              taskId: input.id,
              NOT: input.subtasks?.map((sub) => ({ id: sub.id })),
            },
          },
          column: {
            connect: {
              id: input.column,
            },
          },
        },
        include: {
          subtasks: true,
        },
      })
    }),

  deleteById: procedure
    .input(objectWithIdValidator)
    .mutation(async ({ input, ctx }) => {
      return await ctx.dbClient.task.delete({
        where: {
          id: input.id,
        },
      })
    }),
})
