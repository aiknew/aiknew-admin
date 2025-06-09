import { Request } from 'express'
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { rm } from 'node:fs/promises'
import { AllExceptionsFilter } from 'src/common/filters'

@Catch(HttpException)
export class DelInvalidFileFilter extends AllExceptionsFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host)
    // delete the file that failed verification
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    if (request?.file?.path) {
      rm(request.file.path, { force: true }).catch((err) => {
        throw err
      })
    }
  }
}
