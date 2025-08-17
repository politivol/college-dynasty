# College Dynasty

Minimal scaffold for a college football dynasty manager built with Next.js 14, tRPC, Prisma and Supabase.

## Development

```bash
pnpm install
cp .env.example .env
pnpm prisma migrate dev --name init
pnpm prisma db seed
pnpm dev
```
