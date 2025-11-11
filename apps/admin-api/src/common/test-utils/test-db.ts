import { type PrismaService } from "@aiknew/shared-admin-db"
import { execSync } from "child_process"

export const resetDB = async (prismaService: PrismaService) => {
  const tables = await prismaService.$queryRaw<Array<{ tablename: string }>>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `
  for (const { tablename } of tables) {
    if (tablename !== "_prisma_migrations") {
      await prismaService.$executeRawUnsafe(
        `TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`,
      )
    }
  }

  execSync("pnpm db:seed:test", { stdio: "inherit" })
}
