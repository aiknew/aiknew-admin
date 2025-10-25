import {
  Injectable,
  BadRequestException,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from "@nestjs/common"
import { I18nContext } from "nestjs-i18n"
import { t } from "@aiknew/shared-api-utils"

class WarpFileTypeValidator extends FileTypeValidator {
  buildErrorMessage(): string {
    return t("upload-file.unsupportedFileType")
  }
}

@Injectable()
export class WarpParseFilePipe extends ParseFilePipe {
  constructor() {
    super({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 1024 * 1024 * 20,
          message: (maxSize: number) =>
            I18nContext.current()?.t("upload-file.fileSizeInvalid", {
              args: { maxSize: maxSize / 1024 / 1024 },
              lang: I18nContext.current()?.lang,
            }) ?? "invalid file size",
        }),
        // Disabled magic number verification temporarily, wait for：https://github.com/nestjs/nest/issues/15055
        new WarpFileTypeValidator({
          fileType: "^(image/.*|video/.*)$",
          skipMagicNumbersValidation: true,
        }),
      ],
      exceptionFactory(errMsg: string) {
        return new BadRequestException(errMsg)
      },
    })
  }
}
