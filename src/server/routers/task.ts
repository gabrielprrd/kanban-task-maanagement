import { z } from 'zod'
import { procedure, router } from '../trpc'
import { CreateOrUpdateTask } from '@/models/index'

const uuid = z.string().uuid().optional()

export const taskRouter = router({
  getById: procedure.input(uuid).query(async ({ input, ctx }) => {
    return await ctx.dbClient.task.findUnique({
      where: {
        id: input,
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
            // connectOrCreate: input.subtasks?.map((sub) => ({
            //   where: {
            //     id: sub.id || '',
            //   },
            //   create: sub,
            // })),

            deleteMany: {
              taskId: input.id || '',
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
          column: true,
        },
      })
    }),

  deleteById: procedure.input(uuid).mutation(async ({ input, ctx }) => {
    return await ctx.dbClient.task.delete({
      where: {
        id: input,
      },
    })
  }),
})
