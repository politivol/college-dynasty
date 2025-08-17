import { db } from "../../../../../server/db";
import TableReview from "../../../../../components/ocr/TableReview";

export default async function ReviewPage({ params }: { params: { batchId: string } }) {
  const batch = await db.importBatch.findUnique({ where: { id: params.batchId } });
  const rows = ((batch?.parsedJson as any)?.rows as Record<string, any>[] | undefined) || [];
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-bold">Review Import</h1>
      <TableReview rows={rows} />
    </main>
  );
}
