import { db } from "../../../../../server/db";

export default async function TargetPage({ params }: { params: { targetId: string } }) {
  const target = await db.recruitTarget.findUnique({ where: { id: params.targetId } });
  if (!target) return <div>Not found</div>;
  return (
    <main>
      <h1 className="text-xl font-bold">{target.name}</h1>
      <p>Position: {target.position}</p>
    </main>
  );
}
