import { auth, signOut } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function SignOut() {
  const session = await auth();
  
  // Redirect to home if not signed in
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-6 text-white">
        <h2 className="text-center text-3xl font-bold">Sign out</h2>
        <p className="text-center">Are you sure you want to sign out?</p>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
          className="mt-8 space-y-6"
        >
          <button
            type="submit"
            className="w-full rounded-md bg-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
} 