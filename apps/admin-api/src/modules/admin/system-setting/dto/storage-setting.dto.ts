import { IsString } from 'class-validator'

export class StorageSettingDto {
  @IsString()
  currentStorage: string
}
