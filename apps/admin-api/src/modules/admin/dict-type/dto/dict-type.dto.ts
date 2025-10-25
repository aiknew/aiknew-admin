import { DictTypeTranslationDto } from "./dict-type-translation.dto"

export class DictTypeDto {
  id: string
  key: string
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
  translations: DictTypeTranslationDto[]
}
