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

  getAll: publicProcedure.query((opts) => {
    return opts.ctx.db.example.findMany();
  }),

  create: publicProcedure
    .input(z.object({ text: z.string().min(5) }))
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
