import { db } from "../../../../server/db";

export default async function TeamDetail({ params }: { params: { teamId: string } }) {
  const team = await db.team.findUnique({ where: { id: params.teamId }, include: { players: true } });
  if (!team) return <div>Not found</div>;
  return (
    <main>
      <h1 className="text-xl font-bold">{team.name}</h1>
      <h2 className="mt-4 font-semibold">Roster</h2>
      <ul className="space-y-1">
        {team.players.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}
