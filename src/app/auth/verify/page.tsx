export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white/10 p-6 text-white text-center">
        <h2 className="text-3xl font-bold">Check your email</h2>
        <div className="space-y-4">
          <p className="text-lg">
            A sign in link has been sent to your email address.
          </p>
          <p className="text-sm text-gray-300">
            If you don't see it, check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
} 