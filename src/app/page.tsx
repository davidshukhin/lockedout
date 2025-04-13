import { auth, signIn, signOut } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { CanvasKeyForm } from "~/components/CanvasKeyForm";
import { BlockListForm } from "~/components/BlockListForm"; // you must create this component
import { LinkClasses } from "~/components/LinkClasses";
import { SignOutButton } from "~/components/SignOutButton";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] text-white px-6 py-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          {session?.user ? (
            <>
              <header className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                  Welcome, <span className="text-[hsl(280,100%,70%)]">{session.user.name}</span>
                </h1>
                <p className="text-white/70 text-lg mt-2">
                  Let's focus and block out distractions while tackling your assignments.
                </p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left: Block List / Canvas Key */}
                <div className="flex flex-col gap-6">
                  <section className="bg-white/10 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Manage Blocked Websites</h2>
                    <BlockListForm />
                  </section>
                  <section className="bg-white/10 p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Link Your Classes</h2>
                    <LinkClasses />
                  </section>
                </div>

                {/* Right: Assignment List */}
                <div className="bg-white/10 p-6 rounded-lg shadow">
                  <CanvasKeyForm />
                </div>
              </div>

              <div className="text-center mt-10">
                <SignOutButton />
              </div>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-extrabold tracking-tight mb-4">
                Welcome to <span className="text-[hsl(280,100%,70%)]">Chicken Jockey</span>
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Focus-first learning with assignment tracking and website blocking.
              </p>
              <form
                action={async () => {
                  "use server";
                  await signIn();
                }}
              >
                <button className="rounded-full bg-[hsl(280,100%,70%)] px-10 py-3 font-semibold text-black hover:bg-[hsl(280,100%,80%)]">
                  Get Started
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}

