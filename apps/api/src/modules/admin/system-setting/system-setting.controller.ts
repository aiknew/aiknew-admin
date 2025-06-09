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
import { SystemSettingKey } from 'src/common/enums'
import { AppBadRequestException } from 'src/common/exceptions'
import { ApiParam } from '@nestjs/swagger'
import {
  AppApiBadRequestResponse,
  AppApiInternalServerErrorResponse,
  AppApiOkResponse,
} from 'src/common/decorators'

@Controller('system-setting')
export class SystemSettingController {
  constructor(private systemSettingService: SystemSettingService) {}

  @Get(':key')
  @ApiParam({
    name: 'key',
    enumName: 'SystemSettingKey',
    enum: SystemSettingKey,
  })
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
  @AppApiOkResponse()
  @AppApiInternalServerErrorResponse()
  async setSetting(@Body() systemSettingDto: SystemSettingDto) {
    await this.systemSettingService.setSystemSetting(systemSettingDto)
  }
}
