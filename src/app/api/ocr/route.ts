import { NextResponse } from "next/server";
import { db } from "../../../server/db";

export async function POST(req: Request) {
  const { batchId } = await req.json();
  await db.importBatch.update({ where: { id: batchId }, data: { status: "PARSED" } });
  return NextResponse.json({ ok: true });
}
