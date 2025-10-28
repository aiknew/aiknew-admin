import { createHmac } from "crypto"

export const createHMAC = (data: string, secret: string | undefined) => {
  if (!data) throw new Error("data is required")
  if (!secret) throw new Error("createHMAC: SECRET is required")

  const hmac = createHmac("sha256", secret, {
    encoding: "utf-8",
  })
  hmac.update(data)
  return hmac.digest("hex")
}
