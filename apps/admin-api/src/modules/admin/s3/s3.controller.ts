import { Controller, Get, Param, Post, Query, Req } from "@nestjs/common"
import { S3Service } from "./s3.service"
import {
  AppApiOkResponse,
  Permission,
  Public,
} from "@aiknew/shared-api-decorators"
import { plainToInstance } from "class-transformer"
import { PresignedDataDto, S3WebhookBodyDto } from "./dto"
import type { AuthAdminRequest } from "@aiknew/shared-api-types"
import { PermissionGroup } from "@aiknew/shared-api-decorators"

@PermissionGroup({ name: "s3.s3Management" })
@Controller("s3")
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  /**
   * S3 webhook
   * @param req Express Request Object with auth info
   * @returns
   */
  @Public()
  @Post("webhook/:storageId")
  async s3WebhookPost(
    @Param("storageId") storageId: string,
    @Req() req: Request,
  ) {
    const body = plainToInstance(S3WebhookBodyDto, {
      ...req.body,
      storageId,
    })
    return this.s3Service.handleS3Webhook(body)
  }

  /**
   * S3 presigned url
   * @param groupId file group id
   * @param req Express Request Object with auth info
   * @returns
   */
  @Permission({ key: "s3:presigned", name: "s3.s3Presigned" })
  @Get("presigned")
  @AppApiOkResponse(PresignedDataDto)
  async uploadToS3(
    @Query("groupId") groupId: string,
    @Req() req: AuthAdminRequest,
  ): Promise<PresignedDataDto> {
    return this.s3Service.getPresignedPost(groupId, req.adminUser.userId)
  }
}
