import { Controller, Get } from "@nestjs/common"
import { DashboardService } from "./dashboard.service"
import {
  AppApiOkResponse,
  Permission,
  PermissionGroup,
  Public,
} from "@aiknew/shared-api-decorators"
import { HomeStatisticsDto } from "./dto/home-statistics.dto"

@PermissionGroup({ name: "dashboard.dashboardManagement" })
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Public()
  @Permission({
    key: "dashboard:home-statistics",
    name: "dashboard.homeStatistics",
  })
  @Get("home-statistics")
  @AppApiOkResponse(HomeStatisticsDto)
  async getHomeStatistics(): Promise<HomeStatisticsDto> {
    return this.dashboardService.getHomeStatistics()
  }
}
