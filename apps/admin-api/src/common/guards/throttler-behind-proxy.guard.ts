import { ThrottlerGuard } from '@nestjs/throttler'
import { Injectable } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip
  }

  protected async getErrorMessage(): Promise<string> {
    return (
      I18nContext?.current()?.t('common.frequentRequest', {
        lang: I18nContext.current()?.lang
      }) ?? this.errorMessage
    )
  }
}
