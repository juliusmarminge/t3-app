import Link from "next/link";
import { Suspense } from "react";

import { getServerAuthSession } from "~/server/auth";
import { type RouterOutputs, api } from "trpc-api";
import { revalidateTag } from "next/cache";
import { SubmitButton } from "./_components/form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-16">
      <div className="container flex flex-col items-center gap-12 px-4 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-purple-400">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-foreground/10 p-4 hover:bg-foreground/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-lg">
              Just the basics - Everything you need to know to set up your
              database and authentication.
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-foreground/10 p-4 hover:bg-foreground/20"
            href="https://create.t3.gg/en/introduction"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Documentation →</h3>
            <div className="text-lg">
              Learn more about Create T3 App, the libraries it uses, and how to
              deploy it.
            </div>
          </Link>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-8">
          {/** @ts-expect-error - Async Server Component */}
          <AuthShowcase />
          <form
            className="w-full space-y-2"
            action={async (fd) => {
              "use server";

              const text = fd.get("text") as string;
              try {
                await api.example.create.mutate({ text });
              } catch {
                return;
              }

              // TODO: trpc.example.create.revalidate();
              const tag = `example.getAll`;
              console.log("Revalidating tag", tag);
              revalidateTag(tag);
            }}
          >
            <input
              name="text"
              placeholder="Enter some text"
              className="flex h-10 w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm"
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </form>
          <Suspense fallback={<div>Loading...</div>}>
            {/** @ts-expect-error - Async Server Component */}
            <PostList promise={api.example.getAll.query()} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

async function PostList(props: {
  promise: Promise<RouterOutputs["example"]["getAll"]>;
}) {
  const posts = await props.promise;

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="-mt-4 mb-2 text-lg font-semibold">
        Fetched posts at {new Date(posts.fetchedAt).toLocaleTimeString()} in{" "}
        {posts.duration} ms.
      </p>
      {posts.items.map((post) => (
        <p key={post.id} className="text-lg">
          {post.text}
        </p>
      ))}
    </div>
  );
}

async function AuthShowcase() {
  const session = await getServerAuthSession();

  // const secretMessage =
  //   session?.user && (await api.example.getSecretMessage.query());

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session.user?.name}</span>}
        {/* {secretMessage && <span> - {secretMessage}</span>} */}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
