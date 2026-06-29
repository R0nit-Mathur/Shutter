import { signIn } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Login",
  description: "Sign in to your Shutter account to access the AI Visibility Console.",
  alternates: {
    canonical: "/login",
  },
};

export default async function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#05070A] px-6 overflow-hidden font-sans text-white">
      {/* Dynamic Backlights */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[#4F8CFF]/10 blur-[130px]" />
      
      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md p-10 sm:p-14 rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl shadow-2xl flex flex-col items-center text-center space-y-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col items-center gap-3.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-1">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-[#4F8CFF] to-[#70a3ff] shadow-lg shadow-[#4F8CFF]/20 group-hover:scale-105 transition-transform duration-200">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-[#05070A] fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-[0.25em] text-white">
            SHUTTER
          </span>
        </Link>

        {/* Heading Texts */}
        <div className="space-y-2">
          <h1 className="text-3xl font-light tracking-tight text-white">Welcome Back</h1>
          <p className="text-xs text-[#A1A1AA] max-w-[260px] mx-auto leading-relaxed font-light">
            Sign in to access your AI Visibility Console and run organic search diagnostic audits.
          </p>
        </div>

        {/* Server Action Form */}
        <form
          className="w-full"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/dashboard" }); 
          }}
        >
          <button 
            type="submit" 
            aria-label="Sign in with your Google account"
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white text-[#05070A] hover:bg-neutral-200 font-semibold rounded-full text-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            <svg className="block shrink-0" viewBox="0 0 24 24" width="18" height="18">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.48 3.77v3.12h4a11.5 11.5 0 0 0 3.53-8.74z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-4-3.12c-1.11.74-2.53 1.18-3.93 1.18-3.03 0-5.6-2.05-6.51-4.82H1.31v3.2A12 12 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M5.49 14.33A7.13 7.13 0 0 1 5.08 12c0-.81.14-1.59.41-2.33V6.47H1.31A12 12 0 0 0 0 12c0 2.05.52 4 1.31 5.53l4.18-3.2z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43A11.77 11.77 0 0 0 12 0 12 12 0 0 0 1.31 6.47l4.18 3.2c.91-2.77 3.48-4.82 6.51-4.82z"/>
            </svg>
            Sign in with Google
          </button>
        </form>

        {/* Back Link */}
        <div className="border-t border-white/[0.05] pt-5 w-full text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded px-1"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
