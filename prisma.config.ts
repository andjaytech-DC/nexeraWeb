import "dotenv/config";
import { defineConfig } from "prisma/config";
export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    // Only migration/introspection commands need this. Read process.env directly
    // instead of the `env()` helper so `prisma generate` still works when
    // DATABASE_URL is not set (e.g. Vercel Preview builds without a database).
    url: process.env.DATABASE_URL ?? "",
  },
});
