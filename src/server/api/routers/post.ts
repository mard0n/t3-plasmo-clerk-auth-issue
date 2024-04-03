import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { posts } from "~/server/db/schema"

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("create post", input.name)

      // simulate a slow db call
      // await new Promise((resolve) => setTimeout(resolve, 1000))

      await ctx.db.insert(posts).values({
        name: input.name
      })

      return "success"
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)]
    })
  })
})
