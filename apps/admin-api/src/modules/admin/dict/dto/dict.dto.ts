import { DictTranslationDto } from "./dict-translation.dto"

export class DictDto {
  id: string
  value: string
  dictTypeId: string
  order: number
  status: boolean
  createdAt: Date
  updatedAt: Date
  translations: DictTranslationDto[]
}