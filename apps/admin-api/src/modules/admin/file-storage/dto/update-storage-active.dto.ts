import { IsBoolean, IsString } from 'class-validator'

export class UpdateStorageActiveDto {
  @IsString()
  id: string

  @IsBoolean()
  active: boolean
}
