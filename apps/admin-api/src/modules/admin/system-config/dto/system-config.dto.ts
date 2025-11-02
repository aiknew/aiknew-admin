import { SystemConfigTranslationDto } from "./system-config-translation.dto"

export class SystemConfigDto {
  id: string

  key: string

  value: string

  builtIn: boolean

  createdAt: Date

  updatedAt: Date

  translations: SystemConfigTranslationDto[]
}
