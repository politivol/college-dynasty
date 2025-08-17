import { db } from "../../../server/db";
import BoardTable from "../../../components/recruiting/BoardTable";
import PortalTable from "../../../components/recruiting/PortalTable";

export default async function RecruitingPage() {
  const targets = await db.recruitTarget.findMany({ where: { portal: false } });
  const portal = await db.recruitTarget.findMany({ where: { portal: true } });
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-bold">Recruiting Board</h1>
      <BoardTable targets={targets} />
      <h2 className="text-lg font-semibold">Transfer Portal</h2>
      <PortalTable targets={portal} />
    </main>
  );
}
