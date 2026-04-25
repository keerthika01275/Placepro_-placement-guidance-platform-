export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#070707] px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-4xl font-black">Forgot Password</h1>
        <p className="mt-2 text-white/60">Enter your email to reset password.</p>
        <input className="mt-8 w-full rounded-2xl bg-white/10 px-4 py-3 outline-none" placeholder="Email" />
        <button className="btn-primary mt-6 w-full">Send Reset Link</button>
      </div>
    </main>
  );
}