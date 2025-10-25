import { OmitType, PartialType } from "@nestjs/swagger"
import { CreateDictTypeDto } from "./create-dict-type.dto"

export class UpdateDictTypeDto extends OmitType(
  PartialType(CreateDictTypeDto),
  ["key"],
) {}
