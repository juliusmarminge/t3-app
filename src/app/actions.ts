"use server";
import { prisma as db } from "~/server/db";
// import { createAction, publicProcedure } from "~/server/api/trpc";
// import { createPost } from "~/server/api/routers/example";
// import * as z from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

// export const create = createAction(createPost);
export async function create(fd: FormData) {
  const session = await getServerSession(authOptions);
  console.log("session", session);

  const text = fd.get("text") as string;

  return await db.post.create({
    data: {
      text: text,
      createdBy: { connect: { id: session?.user.id } },
    },
  });
}

// export const edit = createAction(
//   publicProcedure
//     .input(
//       z.object({
//         id: z.string(),
//         text: z.string().min(1),
//       })
//     )
//     .mutation((opts) => {
//       return opts.ctx.db.post.update({
//         where: {
//           id: opts.input.id,
//         },
//         data: {
//           text: opts.input.text,
//         },
//       });
//     })
// );
