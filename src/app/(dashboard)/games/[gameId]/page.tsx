import { db } from "../../../../server/db";

export default async function GamePage({ params }: { params: { gameId: string } }) {
  const game = await db.game.findUnique({ where: { id: params.gameId } });
  if (!game) return <div>Not found</div>;
  return (
    <main>
      <h1 className="text-xl font-bold">Week {game.week}</h1>
      <p>{game.homeTeam} vs {game.awayTeam}</p>
      {game.homeScore != null && game.awayScore != null && (
        <p className="mt-2">Final: {game.homeScore}-{game.awayScore}</p>
      )}
    </main>
  );
}
