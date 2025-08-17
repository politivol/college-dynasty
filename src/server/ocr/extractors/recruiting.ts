export interface RecruitRow {
  name: string;
  position: string;
  stars?: number;
  status?: string;
  interest?: Record<string, unknown>;
}

export function parseRecruiting(text: string): RecruitRow[] {
  return text
    .trim()
    .split(/\n+/)
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      return { name: parts[0] || "", position: parts[1] || "", stars: parts[2] ? Number(parts[2]) : undefined, status: parts[3] };
    })
    .filter((r) => r.name && r.position);
}
