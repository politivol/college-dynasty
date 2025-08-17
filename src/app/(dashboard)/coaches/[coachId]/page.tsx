import { db } from "../../../../server/db";

export default async function CoachPage({ params }: { params: { coachId: string } }) {
  const coach = await db.coach.findUnique({ where: { id: params.coachId } });
  if (!coach) return <div>Not found</div>;
  return (
    <main>
      <h1 className="text-xl font-bold">{coach.name}</h1>
      <p>Record: {coach.recordW}-{coach.recordL}</p>
    </main>
  );
}
