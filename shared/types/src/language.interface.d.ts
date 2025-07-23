import { LanguageOrientation } from '@aiknew/shared-admin-db'

export interface ILanguage {
  name: string

  key: string

  orientation: LanguageOrientation

  status: boolean

  order: number

  createdAt: Date | string

  updatedAt: Date | string
}
