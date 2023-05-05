import { createTRPCProxyClient, httpLink } from "@trpc/client";

import type { AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";
import { headers } from "next/headers";

export type * from "./shared";

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    (runtime) => {
      return (ctx) => {
        const { op } = ctx;
        const { path, input, type } = op;
        const tag = `${path}?input=${JSON.stringify(input)}`;

        type === "query" && console.log("Fetching with tag", tag);

        const link = httpLink({
          url: getUrl(),
          fetch: (url, opts) => {
            return fetch(url, {
              ...opts,
              next: type === "query" ? { tags: [tag] } : undefined,
            });
          },
          // FIXME: We need the headers for auth - but server actions just breaks with them...
          headers: () => {
            const { connection: _, ...h } = Object.fromEntries(headers());
            return h;
          },
        })(runtime);

        return link(ctx);
      };
    },
  ],
});
