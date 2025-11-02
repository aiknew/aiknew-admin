import { PartialType } from "@nestjs/swagger"
import { CreateSystemConfigDto } from "./create-system-config.dto"

export class UpdateSystemConfigDto extends PartialType(CreateSystemConfigDto) {}
