import { ConfigTranslationDto } from "./config-translation.dto"

class Translation extends ConfigTranslationDto {
  declare remark: string
}

export class ConfigDto {
  id: string

  key: string

  value: string

  system: boolean

  createdAt: Date

  updatedAt: Date

  translations: Translation[]
}