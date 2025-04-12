import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth, signIn, signOut } from "~/server/auth";
import { HydrateClient, api } from "~/trpc/server";
import { saveCanvasKey } from "~/server/actions/canvas";
import { CanvasKeyForm } from "~/components/CanvasKeyForm";
export default async function Home() {
  const session = await auth();
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        {session?.user ? (
          // Signed-in user view
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
              Welcome back,{" "}
              <span className="text-[hsl(280,100%,70%)]">{session.user.name}</span>
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/dashboard"
              >
                <h3 className="font-bold text-2xl">Dashboard →</h3>
                <div className="text-lg">
                  View your personalized dashboard and manage your account.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/profile"
              >
                <h3 className="font-bold text-2xl">Profile →</h3>
                <div className="text-lg">
                  Update your profile information and preferences.
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className='w-full max-w-md' >
                <CanvasKeyForm />
              </div>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        ) : (
          // Signed-out user view
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <h1 className="font-extrabold text-5xl tracking-tight sm:text-[5rem]">
              Welcome to{" "}
              <span className="text-[hsl(280,100%,70%)]">Chicken Jockey</span>
            </h1>
            <p className="text-center text-2xl">
              Your all-in-one platform for managing your content and connections.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/features"
              >
                <h3 className="font-bold text-2xl">Features →</h3>
                <div className="text-lg">
                  Discover what makes our platform unique and powerful.
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
                href="/pricing"
              >
                <h3 className="font-bold text-2xl">Pricing →</h3>
                <div className="text-lg">
                  Choose the perfect plan for your needs.
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-4">
              <form
                action={async () => {
                  "use server";
                  await signIn();
                }}
              >
                <button className="rounded-full bg-[hsl(280,100%,70%)] px-10 py-3 font-semibold text-black no-underline transition hover:bg-[hsl(280,100%,80%)]">
                  Get Started
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </HydrateClient>
  );
}
