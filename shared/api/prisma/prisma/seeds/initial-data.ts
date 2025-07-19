import postgres from 'postgres'

export const createInitialData = async () => {
  const prismaURL = process.env.DATABASE_URL
  const url = prismaURL.substring(0, prismaURL.indexOf('?')) // remove the 'schema' parameter of the database URL
  const sql = postgres(url)
  const sqlFilePath = new URL('./data.sql', import.meta.url).pathname

  await sql.file(sqlFilePath)
  await sql.end()
}
