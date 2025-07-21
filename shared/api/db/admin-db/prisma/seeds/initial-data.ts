import postgres from 'postgres'

export const createInitialData = async () => {
  const sql = postgres(process.env.DATABASE_URL)
  const sqlFilePath = new URL('./data.sql', import.meta.url).pathname

  await sql.file(sqlFilePath)
  await sql.end()
}
