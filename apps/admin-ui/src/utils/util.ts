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
