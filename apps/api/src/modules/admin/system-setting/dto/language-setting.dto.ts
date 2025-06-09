import { IsBoolean, IsString } from 'class-validator'

export class LanguageSettingDto {
  // whether to enable multi-language
  @IsBoolean()
  enableMultilingual: boolean = true

  // TODO: validate that the language should be exists in the language table rows
  // language key, the main language, when the multi-language option is disabled, it also serve as the reference language for translating into other languages
  @IsString()
  mainLanguage: string = 'en'
}
