import { getServerSession } from "next-auth";
import { inferAsyncReturnType } from "@trpc/server";
import { authOptions } from "../auth";
import { db } from "../db";

export async function createContext() {
  const session = await getServerSession(authOptions);
  return { db, session };
}

export type Context = inferAsyncReturnType<typeof createContext>;
