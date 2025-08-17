import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function getPublicUrl(path: string) {
  const { data } = supabase.storage.from(process.env.SUPABASE_BUCKET!).getPublicUrl(path);
  return data.publicUrl;
}
