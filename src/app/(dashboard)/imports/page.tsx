import { db } from "../../../server/db";
import Link from "next/link";

export default async function ImportsPage() {
  const batches = await db.importBatch.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Imports</h1>
      <ul className="space-y-2">
        {batches.map((b) => (
          <li key={b.id}>
            <Link href={`/imports/review/${b.id}`}>{b.type} - {b.status}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
