import { LanguageOrientation } from '@aiknew/shared-api-prisma'

export interface ILanguage {
  name: string

  key: string

  orientation: LanguageOrientation

  status: boolean

  order: number

  createdAt: Date | string

  updatedAt: Date | string
}
