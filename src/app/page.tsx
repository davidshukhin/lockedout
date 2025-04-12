
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

          <div className="container max-w-7xl flex flex-col gap-12 px-4 py-16">
            {/* Welcome message */}
            <h1 className="text-center font-extrabold text-5xl tracking-tight sm:text-[5rem] text-white">
              Welcome back,{" "}
              <span className="text-[hsl(280,100%,70%)]">{session.user.name}</span>
            </h1>

            {/* Navigation cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Link
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition"
                href="/dashboard"
              >
                <h3 className="font-bold text-2xl">Dashboard →</h3>
                <p className="text-lg text-white/80">
                  View your personalized dashboard and manage your account.
                </p>
              </Link>
              <Link
                className="flex flex-col gap-4 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition"
                href="/profile"
              >
                <h3 className="font-bold text-2xl">Profile →</h3>
                <p className="text-lg text-white/80">
                  Update your profile information and preferences.
                </p>
              </Link>
            </div>

            {/* Canvas Key Form */}
            <div className="w-full">
              <CanvasKeyForm />
            </div>

            {/* Sign out */}
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <div className="flex justify-center mt-8">
                <button className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white hover:bg-white/20 transition">
                  Sign out
                </button>
              </div>
            </form>
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

