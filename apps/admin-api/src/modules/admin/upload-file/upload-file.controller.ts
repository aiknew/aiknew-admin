import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from "@nestjs/common"
import { FileService as UploadFileService } from "./upload-file.service"
import { FileInterceptor } from "@nestjs/platform-express"
import { type Express } from "express"
import { ConfigService } from "@nestjs/config"
import { relative, extname } from "node:path"
import { DelInvalidFileFilter } from "./del-invalid-file.filter"
import { WarpParseFilePipe } from "./file.pipe"
import { UploadFilesAndGroupsDto } from "./dto/upload-files-and-groups.dto"
import { QueryUploadFileDto } from "./dto/query-upload-file.dto"
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  Permission,
  PermissionGroup,
  SuccessMsg,
} from "@aiknew/shared-api-decorators"
import { UpdateUploadFileDto } from "./dto/update-upload-file.dto"
import { CreateUploadFileDto } from "./dto/create-upload-file.dto"
import { t } from "@aiknew/shared-api-utils"
import type { AuthAdminRequest } from "@aiknew/shared-api-types"
import { FileStatus, UploadFileChannel } from "@aiknew/shared-admin-db"

@PermissionGroup({ name: "upload-file.uploadFileManagement" })
@Controller("upload-file")
export class UploadFileController {
  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly configService: ConfigService,
  ) {}

  @Permission({
    key: "upload-file:filesAndGroups",
    name: "upload-file.uploadFileFilesAndGroups",
  })
  @AppApiOkResponse(UploadFilesAndGroupsDto)
  @Get("filesAndGroups")
  async filesAndGroups(
    @Query() queryFileDto: QueryUploadFileDto,
  ): Promise<UploadFilesAndGroupsDto> {
    return this.uploadFileService.getFilesAndGroups(queryFileDto)
  }

  @Permission({
    key: "upload-file:create",
    name: "upload-file.uploadFileCreate",
  })
  @SuccessMsg(t("upload-file.uploadSuccess"))
  @Post()
  @UseInterceptors(FileInterceptor("file"))
  @UseFilters(DelInvalidFileFilter)
  @AppApiCreatedResponse()
  async create(
    @UploadedFile(new WarpParseFilePipe()) file: Express.Multer.File,
    @Req() req: AuthAdminRequest,
    @Body() createUploadFileDto: CreateUploadFileDto,
  ) {
    return this.uploadFileService.createOne({
      fileName: file.filename,
      filePath: relative(
        this.configService.get<string>("common.publicFolder") ?? "",
        file.path,
      ),
      fileExt: extname(file.originalname),
      fileSize: file.size,
      mime: file.mimetype,
      originalName: file.originalname,
      uploaderId: req.adminUser.userId,
      groupId: createUploadFileDto.groupId,
      fileStorageId: createUploadFileDto.fileStorageId,
      status: FileStatus.NORMAL,
      channel: UploadFileChannel.ADMIN,
    })
  }

  @Permission({
    key: "upload-file:update",
    name: "upload-file.uploadFileUpdate",
  })
  @Patch(":id")
  @SuccessMsg(t("upload-file.updateSuccess"))
  @AppApiOkResponse()
  async update(
    @Param("id") fileId: string,
    @Body() updateFileDto: UpdateUploadFileDto,
  ) {
    await this.uploadFileService.updateOne(fileId, updateFileDto)
  }

  @Permission({
    key: "upload-file:delete",
    name: "upload-file.uploadFileDelete",
  })
  @Delete(":id")
  @SuccessMsg(t("upload-file.deleteSuccess"))
  @AppApiOkResponse()
  async deleteFile(@Param("id") fileId: string) {
    await this.uploadFileService.deleteOne(fileId)
  }
}
