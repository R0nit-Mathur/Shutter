import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import AeoDashboard from "@/components/dashboard/AeoDashboard";

export default async function DashboardPage() {
  // Server-side authentication guard
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-brand-bg text-white font-sans flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar session={session} />

      {/* Main AEO Diagnostic Console Workspace */}
      <main className="flex-grow">
        <AeoDashboard />
      </main>

      {/* Footer copyright */}
      <footer className="border-t border-white/[0.05] py-6 text-center text-xs text-text-secondary font-mono">
        © {new Date().getFullYear()} Shutter AEO Diagnostics Console. All rights reserved.
      </footer>
    </div>
  );
}
