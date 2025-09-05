import { BadRequestException } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validateOrReject,
  ValidationError,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator'
import {
  isArray,
  isClass,
  isTranslationObjectArray,
} from '@aiknew/shared-api-utils'
import { I18nContext } from 'nestjs-i18n'
import { LanguageService } from '../../modules/admin/language/language.service'

@ValidatorConstraint({ name: 'TranslationsConstraint', async: true })
export class TranslationsConstraint implements ValidatorConstraintInterface {
  enableWhiteList = true
  validatingProperty = ''

  constructor(private readonly languageService: LanguageService) { }

  async validate(data: unknown, args: ValidationArguments) {
    this.validatingProperty = args.property
    let cls: undefined | (new (...args: any[]) => any) = undefined

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    if (args.constraints && (cls = args.constraints?.[0]) && isClass(cls)) {
      // check the request data whether is an array
      if (!isArray(data)) {
        throw new BadRequestException(
          I18nContext.current()?.t('common.translationsDataTypeErr', {
            args: { property: args.property },
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      // check the array must not be empty
      if (!data.length) {
        throw new BadRequestException(
          I18nContext.current()?.t('common.translationsEmptyErr', {
            args: { property: args.property },
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      // check the array items must be a object, and must have langId property
      if (!isTranslationObjectArray(data)) {
        throw new BadRequestException(
          I18nContext.current()?.t('common.translationsEachItemType', {
            args: { property: args.property },
            lang: I18nContext.current()?.lang,
          }),
        )
      }

      // check if all enabled language keys are present in the request data
      const enabledLangs = await this.languageService.getEnabledLangs()
      const enabledLangKeys = enabledLangs.map((lang) => lang.key)
      const langKeysInRequestData = new Set(data.map((item) => item.langKey))
      for (const key of enabledLangKeys) {
        if (!langKeysInRequestData.has(key)) {
          throw new BadRequestException(
            I18nContext.current()?.t('common.translationMissing', {
              args: {
                langName: enabledLangs?.find?.((item) => item.key === key)
                  ?.name,
                property: args.property,
              },
              lang: I18nContext.current()?.lang,
            }),
          )
        }
      }

      // FIXME: whitelist didn't work
      // validate each data object in the array
      const validationPromises: Promise<boolean>[] = []
      for (let i = 0, len = data.length; i < len; i++) {
        validationPromises.push(
          validateOrReject(plainToInstance(cls, data[i]), {
            whitelist: this.enableWhiteList,
          })
            .then(() => true)
            .catch((errors: ValidationError[]) => {
              const errMsgArr: string[] = []
              errors.forEach((err) =>
                Object.values(err.constraints ?? {}).forEach((msg) =>
                  errMsgArr.push(
                    I18nContext.current()?.t('common.errTypeInLangData', {
                      args: {
                        errMsg: msg,
                        property: this.validatingProperty,
                      },
                      lang: I18nContext.current()?.lang,
                    }) ?? '',
                  ),
                ),
              )
              throw new BadRequestException(errMsgArr)
            }),
        )
      }

      return Promise.all(validationPromises).then(() => true)
    }

    return false
  }

  defaultMessage() {
    return (
      I18nContext.current()?.t('common.translationValidationErr', {
        args: { property: this.validatingProperty },
        lang: I18nContext.current()?.lang,
      }) ?? 'validation error'
    )
  }
}

export function ValidateTranslations(
  cls: new (...args: any[]) => unknown,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [cls],
      validator: TranslationsConstraint,
    })
  }
}
