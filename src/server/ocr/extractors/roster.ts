export interface RosterRow {
  name: string;
  position: string;
  year?: string;
  ovr?: number;
  attrs?: Record<string, unknown>;
}

export function parseRoster(text: string): RosterRow[] {
  return text
    .trim()
    .split(/\n+/)
    .map((line) => {
      const parts = line.trim().split(/\s+/);
      return { name: parts[0] || "", position: parts[1] || "", year: parts[2], ovr: parts[3] ? Number(parts[3]) : undefined };
    })
    .filter((r) => r.name && r.position);
}
