import { z } from "zod";

export const CreatePostSchema = z.object({
  dynastyId: z.string().cuid(),
  title: z.string().min(3).max(120),
  body: z.string().max(2000).optional(),
  images: z.array(z.string().url()).max(6),
});

export const ReportResultSchema = z.object({
  gameId: z.string().cuid(),
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
  notes: z.string().max(500).optional(),
});

export const CreateImportBatchSchema = z.object({
  dynastyId: z.string().cuid(),
  teamId: z.string().cuid().optional(),
  type: z.enum(["ROSTER","RECRUITING"]),
  imageUrl: z.string().url(),
});

export const CommitRosterSchema = z.object({
  batchId: z.string().cuid(),
  columnMap: z.object({
    name: z.string(),
    position: z.string(),
    year: z.string().optional(),
    ovr: z.string().optional(),
    attrs: z.record(z.string()).optional(),
  }),
});

export const CommitRecruitingSchema = z.object({
  batchId: z.string().cuid(),
  columnMap: z.object({
    name: z.string(),
    position: z.string(),
    stars: z.string().optional(),
    status: z.string().optional(),
    interestCols: z.array(z.string()).optional(),
  }),
});

export const CreatePollSchema = z.object({
  dynastyId: z.string().cuid(),
  question: z.string().min(4).max(200),
  options: z.array(z.string().min(1)).min(2).max(6),
  closesAt: z.date().optional(),
});
