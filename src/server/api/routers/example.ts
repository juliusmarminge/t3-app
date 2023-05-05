import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query((opts) => {
    return {
      greeting: `Hello ${opts.input.text}`,
    };
  }),

  getAll: publicProcedure.query(async (opts) => {
    const startTime = Date.now();
    const items = await opts.ctx.db.example.findMany({
      take: 10,
      orderBy: { updatedAt: "desc" },
    });
    const duration = Date.now() - startTime;

    return { items, duration, fetchedAt: new Date(startTime) };
  }),

  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .mutation((opts) => {
      return opts.ctx.db.example.create({
        data: {
          text: opts.input.text,
        },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
