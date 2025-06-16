import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { map, Observable } from 'rxjs'
import { SuccessMsg } from '@aiknew/shared-api-decorators'
import { I18nContext, I18nService } from 'nestjs-i18n'
import { getTranslation, SuccessResponse } from '@aiknew/shared-api-utils'
import { type Request } from 'express'

@Injectable()
export class ResponseJsonInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly i18n: I18nService,
  ) {}

  getDefaultMsg(context: ExecutionContext) {
    const reqMethod = context.switchToHttp().getRequest<Request>().method

    let msg = getTranslation(
      this.reflector.get(SuccessMsg, context.getHandler()),
    )

    if (!msg) {
      switch (reqMethod.toUpperCase()) {
        case 'POST':
          msg = this.i18n.t('common.postSuccess', {
            lang: I18nContext.current()?.lang,
          })
          break
        case 'PATCH':
          msg = this.i18n.t('common.patchSuccess', {
            lang: I18nContext.current()?.lang,
          })
          break
        case 'DELETE':
          msg = this.i18n.t('common.deleteSuccess', {
            lang: I18nContext.current()?.lang,
          })
          break
        default:
          msg = this.i18n.t('common.requestSuccess', {
            lang: I18nContext.current()?.lang,
          })
      }
    }

    return msg
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof SuccessResponse) {
          return data
        }
        return new SuccessResponse(this.getDefaultMsg(context)).setData(
          data ?? {},
        )
      }),
    )
  }
}
