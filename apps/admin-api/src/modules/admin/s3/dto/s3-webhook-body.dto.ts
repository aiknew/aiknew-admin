import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from "class-validator"
import { Type } from "class-transformer"
import { S3EventsEnum } from "../enum/s3-events.enum"

export class S3ObjectUserMetadata {
  @IsString()
  @IsDefined()
  "X-Amz-Meta-Groupid": string

  @IsDefined()
  @IsNumberString()
  // @Transform(({ value }) => {
  //   console.log('val: ', value, Number(value))
  //   return Number(value)
  // })
  "X-Amz-Meta-Channel": string

  @IsString()
  @IsDefined()
  "X-Amz-Meta-Uploaderid": string
}

export class S3Object {
  @ValidateNested()
  @Type(() => S3ObjectUserMetadata)
  // @Transform(({ value }) => {
  //   console.log(value)
  //   return value
  // })
  userMetadata: S3ObjectUserMetadata

  @IsNumber()
  size: number

  @IsString()
  key: string

  @IsString()
  contentType: string
}

export class S3Bucket {
  @IsString()
  name: string
}

export class S3 {
  @ValidateNested()
  @Type(() => S3Object)
  object: S3Object

  @ValidateNested()
  @Type(() => S3Bucket)
  bucket: S3Bucket
}

export class Record {
  @ValidateNested()
  @Type(() => S3)
  s3: S3
}

export class S3WebhookBodyDto {
  @IsString()
  Key: string

  @IsEnum(S3EventsEnum)
  EventName: S3EventsEnum

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Record)
  Records: Record[]

  @IsString()
  storageId: string
}
