import { ConfigTranslationDto } from "./config-translation.dto"

export class ConfigDto {
  id: string
  key: string
  value: string
  system: boolean
  createdAt: Date
  updatedAt: Date
  translations: ConfigTranslationDto[]
}