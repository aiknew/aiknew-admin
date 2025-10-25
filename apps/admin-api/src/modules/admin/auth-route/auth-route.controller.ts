import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common"
import { AuthRouteService } from "./auth-route.service"
import { UpdateAuthRouteDto } from "./dto/update-auth-route.dto"
import { CreateAuthRouteDto } from "./dto/create-auth-route.dto"
import { AuthRouteDto } from "./dto/auth-route.dto"
import { QueryAuthRouteDto } from "./dto/query-auth-route.dto"
import {
  AppApiCreatedResponse,
  AppApiOkResponse,
  Permission,
  PermissionGroup,
} from "@aiknew/shared-api-decorators"

@PermissionGroup({ name: "auth-route.authRouteManagement" })
@Controller("auth-route")
export class AuthRouteController {
  constructor(private service: AuthRouteService) {}

  @Get("all")
  @Permission({ key: "auth-route:getAll", name: "auth-route.authRouteGetAll" })
  @AppApiOkResponse([AuthRouteDto])
  getAll(@Query() query: QueryAuthRouteDto): Promise<AuthRouteDto[]> {
    return this.service.getAll(query)
  }

  @AppApiCreatedResponse()
  @Permission({ key: "auth-route:create", name: "auth-route.authRouteCreate" })
  @Post()
  async createOne(@Body() data: CreateAuthRouteDto) {
    await this.service.createOne(data)
  }

  @AppApiOkResponse()
  @Permission({ key: "auth-route:update", name: "auth-route.authRouteUpdate" })
  @Patch(":id")
  async updateOne(
    @Param("id") id: string,
    @Body() updateAdminRouteDto: UpdateAuthRouteDto,
  ) {
    await this.service.updateOne(id, updateAdminRouteDto)
  }

  @AppApiOkResponse()
  @Permission({ key: "auth-route:delete", name: "auth-route.authRouteDelete" })
  @Delete(":id")
  async deleteOne(@Param("id") id: string) {
    await this.service.deleteOne(id)
  }
}
