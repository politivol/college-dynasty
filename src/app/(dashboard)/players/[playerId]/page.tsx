import { db } from "../../../../server/db";

export default async function PlayerPage({ params }: { params: { playerId: string } }) {
  const player = await db.player.findUnique({ where: { id: params.playerId }, include: { team: true } });
  if (!player) return <div>Not found</div>;
  return (
    <main>
      <h1 className="text-xl font-bold">{player.name}</h1>
      <p>Position: {player.position}</p>
      {player.team && <p>Team: {player.team.name}</p>}
    </main>
  );
}
