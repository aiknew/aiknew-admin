import type { IResponseJson } from '@aiknew/shared-types'
import { url } from 'zod'
import { join } from 'pathe'

export const resolveQueryStr = (url: string) => {
  const queryString = url.split('?')[1]
  const res: Record<string, string> = {}
  const params = new URLSearchParams(queryString)
  params.forEach((val, key) => {
    res[key] = val
  })

  return res
}

export const splitByLastFlag = (str: string, flag: string) => {
  const index = str.lastIndexOf(flag)
  if (index === -1) {
    return [str, '']
  }

  const firstPart = str.slice(0, index)
  const lastPart = str.slice(index + 1, str.length)

  return [firstPart, lastPart]
}

export const isResponseJson = (v: unknown): v is IResponseJson => {
  return (
    typeof v === 'object' && !!v && 'code' in v && 'data' in v && 'msg' in v
  )
}

export const checkURL = (str: string) => {
  return url({
    protocol: /^https?$/,
  }).safeParse(str)
}

export const resolveURL = (host: string, path: string) => {
  const result = checkURL(host)
  if (result.success) {
    return new URL(path, result.data).href
  }

  return join(host, path)
}
