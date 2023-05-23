import { getServerSession } from "~/server/auth";
import { api } from "trpc-api";
import Link from "next/link";

export async function AuthShowcase() {
  const session = await getServerSession();

  const secretMessage =
    session?.user && (await api.post.getSecretMessage.query());

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-xl">
        {session && <span>Logged in as {session.user?.name}</span>}
        {secretMessage && <span className="text-sm"> - {secretMessage}</span>}
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
