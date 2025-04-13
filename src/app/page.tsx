
import Link from "next/link";
import { auth, signIn, signOut } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { CanvasKeyForm } from "~/components/CanvasKeyForm";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-16">
          {session?.user ? (
            <>
              <section className="text-center">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-2">
                  Welcome back,{" "}
                  <span className="text-[hsl(280,100%,70%)]">{session.user.name}</span>
                </h1>
                <p className="text-lg text-white/80">
                  Let’s get you back on track.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <Card title="Dashboard" href="/dashboard">
                  View your personalized dashboard and manage your progress.
                </Card>
                <Card title="Profile" href="/profile">
                  Update your account info and preferences.
                </Card>
                <Card title="Settings" href="/settings">
                  Configure your experience and integrations.
                </Card>
              </div>

              <section className="w-full max-w-2xl mt-8">
                <CanvasKeyForm />
              </section>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button className="mt-6 rounded-full bg-white/10 px-8 py-3 font-semibold transition hover:bg-white/20">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <section className="text-center">
                <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                  Welcome to <span className="text-[hsl(280,100%,70%)]">Chicken Jockey</span>
                </h1>
                <p className="text-lg text-white/80 mb-8">
                  Your all-in-one platform for managing your courses and focus.
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                <Card title="Features" href="/features">
                  Discover what makes our platform unique and powerful.
                </Card>
                <Card title="Pricing" href="/pricing">
                  Choose the perfect plan for your needs.
                </Card>
              </div>

              <form
                action={async () => {
                  "use server";
                  await signIn();
                }}
              >
                <button className="mt-10 rounded-full bg-[hsl(280,100%,70%)] px-10 py-3 font-semibold text-black transition hover:bg-[hsl(280,100%,80%)]">
                  Get Started
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}

function Card({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between gap-3 rounded-xl bg-white/10 p-6 hover:bg-white/20 transition duration-200 shadow-md"
    >
      <h3 className="text-2xl font-bold">{title} →</h3>
      <p className="text-white/80 text-sm">{children}</p>
    </Link>
  );
}

