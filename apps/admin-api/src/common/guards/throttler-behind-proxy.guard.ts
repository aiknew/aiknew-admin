import { ThrottlerGuard } from "@nestjs/throttler"
import { Injectable } from "@nestjs/common"
import { I18nContext } from "nestjs-i18n"
import type { Request } from "express"

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  protected getTracker(req: Request): Promise<string> {
    const ip = req.ips.length ? req.ips[0] : (req.ip ?? "")

    return Promise.resolve(ip)
  }

  protected async getErrorMessage(): Promise<string> {
    return (
      I18nContext?.current()?.t("common.frequentRequest", {
        lang: I18nContext.current()?.lang,
      }) ?? this.errorMessage
    )
  }
}
