import { createHmac } from 'crypto'

export const createHMAC = (data: string) => {
  if (!data) throw new Error('data is required')
  if (!process.env.ADMIN_USER_PASSWORD_SECRET)
    throw new Error('ADMIN_USER_PASSWORD_SECRET is required')

  const hmac = createHmac('sha256', process.env.ADMIN_USER_PASSWORD_SECRET, {
    encoding: 'utf-8',
  })
  hmac.update(data)
  return hmac.digest('hex')
}
