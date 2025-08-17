import { NextResponse } from "next/server";
import { db } from "../../../server/db";
import { CreateImportBatchSchema } from "../../../lib/validation";

export async function POST(req: Request) {
  const json = await req.json();
  const data = CreateImportBatchSchema.parse(json);
  const batch = await db.importBatch.create({ data: { ...data, createdById: data.dynastyId } });
  return NextResponse.json({ publicUrl: data.imageUrl, batchId: batch.id });
}
