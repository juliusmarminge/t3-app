import { createTRPCNextCaller } from "@trpc/app-router";
import { type inferRouterOutputs } from "@trpc/server";

import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import { getServerAuthSession } from "~/server/auth";

export const api = createTRPCNextCaller({
  router: appRouter,
  createContext: async () => {
    const session = await getServerAuthSession();
    return createInnerTRPCContext({ session });
  },
});

export type RouterOutputs = inferRouterOutputs<typeof appRouter>;
