import { db } from "../../../server/db";
import Link from "next/link";

export default async function TeamsPage() {
  const teams = await db.team.findMany();
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Teams</h1>
      <ul className="space-y-2">
        {teams.map((t) => (
          <li key={t.id}>
            <Link href={`/teams/${t.id}`}>{t.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
