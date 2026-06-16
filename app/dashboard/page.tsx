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
    <div className="h-screen w-screen bg-brand-bg text-white font-sans flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <Navbar session={session} />

      {/* Main AEO Diagnostic Console Workspace */}
      <main className="flex-grow h-[calc(100vh-72px)] mt-[72px] overflow-hidden">
        <AeoDashboard />
      </main>
    </div>
  );
}
