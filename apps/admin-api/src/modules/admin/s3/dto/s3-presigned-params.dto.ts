import { IsString } from "class-validator"

export class S3PresignedParamsDto {
  @IsString()
  groupId: string
}
