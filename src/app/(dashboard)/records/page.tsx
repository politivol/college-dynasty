import { db } from "../../../server/db";

export default async function RecordsPage() {
  const records = await db.teamSeason.findMany();
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Records</h1>
      <ul>
        {records.map((r) => (
          <li key={r.id}>Team {r.teamId}: {r.recordW}-{r.recordL}</li>
        ))}
      </ul>
    </main>
  );
}
