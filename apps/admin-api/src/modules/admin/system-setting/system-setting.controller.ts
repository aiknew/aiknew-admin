import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Put,
} from '@nestjs/common'
import { SystemSettingService } from './system-setting.service'
import { SystemSettingDto } from './dto/system-setting.dto'
import { SystemSettingKey } from '@aiknew/shared-api-enums'
import { AppBadRequestException } from '@aiknew/shared-api-exceptions'
import { ApiParam } from '@nestjs/swagger'
import {
  AppApiBadRequestResponse,
  AppApiInternalServerErrorResponse,
  AppApiOkResponse,
  Permission,
  PermissionGroup,
} from '@aiknew/shared-api-decorators'

@PermissionGroup({ name: 'system-setting.systemSettingManagement' })
@Controller('system-setting')
export class SystemSettingController {
  constructor(private systemSettingService: SystemSettingService) { }

  @Get(':key')
  @ApiParam({
    name: 'key',
    enumName: 'SystemSettingKey',
    enum: SystemSettingKey,
  })
  @Permission({ key: 'system-setting:get', name: 'system-setting.systemSettingGet' })
  @AppApiBadRequestResponse()
  @AppApiOkResponse(SystemSettingDto)
  async getSetting(
    @Param(
      'key',
      new ParseEnumPipe(SystemSettingKey, {
        errorHttpStatusCode: 400,
        exceptionFactory: () => new AppBadRequestException('invalid key'),
      }),
    )
    key: keyof typeof SystemSettingKey,
  ) {
    return await this.systemSettingService.getSystemSetting(key)
  }

  @Put()
  @Permission({ key: 'system-setting:set', name: 'system-setting.systemSettingSet' })
  @AppApiOkResponse()
  @AppApiInternalServerErrorResponse()
  async setSetting(@Body() systemSettingDto: SystemSettingDto) {
    await this.systemSettingService.setSystemSetting(systemSettingDto)
  }
}
