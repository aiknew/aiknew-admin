import { PartialType } from "@nestjs/swagger"
import { CreateDictDto } from "./create-dict.dto"

export class UpdateDictDto extends PartialType(CreateDictDto) { }