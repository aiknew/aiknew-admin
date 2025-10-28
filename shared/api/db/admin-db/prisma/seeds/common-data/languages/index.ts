import { prisma } from "../../prisma"

export const createDefaultLangs = async () => {
  const langs = [
    {
      name: "English",
      key: "en",
    },
    {
      name: "中文简体",
      key: "zh-CN",
    },
    {
      name: "中文繁体",
      key: "zh-TW",
    },
  ]

  return Promise.all(
    langs.map((lang) => {
      return prisma.language.upsert({
        where: {
          key: lang.key,
        },
        update: {},
        create: lang,
      })
    }),
  )
}
