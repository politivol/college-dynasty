import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <Link href="/feed">Go to Feed</Link>
    </main>
  );
}
