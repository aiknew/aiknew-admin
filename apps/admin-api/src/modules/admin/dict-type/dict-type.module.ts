import { Module } from "@nestjs/common";
import { DictTypeController } from "./dict-type.controller";
import { DictTypeService } from "./dict-type.service";

@Module({
  controllers: [DictTypeController],
  providers: [DictTypeService],
})
export class DictTypeModule { }