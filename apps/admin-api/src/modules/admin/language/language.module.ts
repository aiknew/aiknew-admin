import { Global, Module } from '@nestjs/common'
import { LanguageService } from './language.service'
import { LanguageController } from './language.controller'

@Global()
@Module({
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule { }
