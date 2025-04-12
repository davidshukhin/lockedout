import { type ErrorProps } from "next-auth/core/pages";

export default function ErrorPage({ error }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-6 text-white text-center">
        <h2 className="text-3xl font-bold">Error</h2>
        <p className="text-lg">
          {error?.message ?? "Something went wrong!"}
        </p>
      </div>
    </div>
  );
} 