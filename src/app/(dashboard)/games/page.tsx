import { db } from "../../../../server/db";
import Link from "next/link";

export default async function GamesPage() {
  const games = await db.game.findMany({ orderBy: { week: "asc" } });
  return (
    <main>
      <h1 className="text-xl font-bold mb-4">Games</h1>
      <ul className="space-y-2">
        {games.map((g) => (
          <li key={g.id}>
            <Link href={`/games/${g.id}`}>Week {g.week}: {g.homeTeam} vs {g.awayTeam}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
