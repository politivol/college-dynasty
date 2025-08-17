#!/bin/sh
pnpm prisma migrate dev --name init
pnpm prisma db seed
