<script
  setup
  lang="ts"
  generic="F extends Field<string>[], R extends AnyZodObject | undefined = undefined, "
>
import { ElFormItem, ElForm } from 'element-plus'
import 'element-plus/es/components/form/style/index'
import 'element-plus/es/components/form-item/style/index'
import { useForm, type GenericObject, type TypedSchema } from 'vee-validate'
import AppFormCmp from './app-form-cmp.vue'
import { toTypedSchema } from '@vee-validate/zod'
import {
  type Field,
  type Components,
  type SpecialOptions,
  errorTabKeysInjectionKey,
  fieldsTabKeysInjectionKey,
  type FormValues,
} from './app-form-utils'
import {
  computed,
  reactive,
  provide,
  ref,
  type ComputedRef,
  type Ref,
  type MaybeRefOrGetter,
  toValue,
} from 'vue'
import {
  object,
  z,
  ZodObject,
  ZodOptional,
  type AnyZodObject,
  type ZodTypeAny,
} from 'zod'
import { t as globalT } from '@aiknew/shared-ui-locales'
import { splitByLastFlag } from '@aiknew/shared-ui-utils'
import type { Prettify } from '@aiknew/shared-ui-types'
import { pick } from 'lodash-es'
import type { ILanguage } from '@aiknew/shared-types'

// The priority of the attribute rules is higher than that set separately in each field
export interface Props<
  R extends AnyZodObject | undefined,
  F extends Field<string>[],
> {
  fields: F
  languages?: ILanguage[]
  t?: typeof globalT
  rules?: R
}

const {
  fields,
  languages = [],
  rules = undefined,
  t = globalT,
} = defineProps<Props<R, F>>()

const isEnabled = (enabled?: MaybeRefOrGetter<boolean>): boolean => {
  if (typeof enabled === 'undefined') {
    return true
  } else {
    return toValue(enabled)
  }
}

const getLangNameByKey = (key: string | undefined) => {
  if (!key) return ''
  return languages.find((lang) => lang.key === key)?.name ?? ''
}

const validationSchema = computed<AnyZodObject>(() => {
  let mergeRules: AnyZodObject
  if (rules) {
    mergeRules = rules
  } else {
    const o: Record<string, ZodTypeAny> = {}
    for (const field of fields) {
      // && isEnabled(field.enabled)
      if (field.rules && isEnabled(field.enabled))
        o[field.name] = toValue(field.rules)
    }
    mergeRules = z.object(o)
  }

  return mergeRules
})

const {
  values,
  setValues,
  errors,
  errorBag,
  defineField,
  handleSubmit,
  handleReset,
  validateField,
  validate,
  setErrors,
  destroyPath,
  resetForm,
  setFieldError,
} = useForm({
  validationSchema: computed(() => toTypedSchema(validationSchema.value)),
})

const fieldsCurrentTabKeys: Ref<Record<string, string>> = ref({})
provide(
  fieldsTabKeysInjectionKey,
  fields
    .filter((item) => item.translation)
    .reduce((o, field) => {
      o.value[field.name] = languages[0].key
      return o
    }, fieldsCurrentTabKeys),
)

const fieldsErrorTabKeys = computed(() => {
  const translationFields = fields
    .filter((item) => item.translation)
    .map((field) => field.name)
  const keyArr = Object.keys(errors.value).filter((err) => {
    return translationFields.some((item) => err.startsWith(item))
  })

  return keyArr.reduce((o, key) => {
    const [fieldKey, langKey] = splitByLastFlag(key, '.')
    if (Array.isArray(o[fieldKey])) {
      o[fieldKey].push(langKey)
    } else {
      o[fieldKey] = [langKey]
    }

    return o
  }, {} as Record<string, string[] | undefined>)
})

provide(errorTabKeysInjectionKey, fieldsErrorTabKeys)

const normalizeType = (as: string) => {
  switch (as) {
    case 'ElCheckbox':
      return 'checkbox'
    case 'ElRadio':
      return 'radio'
    default:
      return 'default'
  }
}

const isSpecialCmp = (as: Components) => {
  return as === 'ElCheckbox' || as === 'ElRadio'
}

const isSpecialOpts = (opts?: unknown[]): opts is SpecialOptions => {
  if (opts && Array.isArray(opts)) {
    return opts.every(
      (item) =>
        item &&
        typeof item === 'object' &&
        'label' in item &&
        'value' in item &&
        typeof item.label === 'string' &&
        typeof item.value === 'string',
    )
  }

  return false
}

const findErrMsg = (
  errors: Partial<Record<string, string | undefined>>,
  fieldName: string,
  translation?: boolean,
) => {
  if (translation) {
    const keys = Object.keys(errors).filter((err) =>
      err.startsWith(`${fieldName}.`),
    )

    const currentTabKeyErr = keys.find(
      (item) =>
        item === `${fieldName}.${fieldsCurrentTabKeys.value[fieldName]}`,
    )
    return errors[currentTabKeyErr ?? keys[0] ?? 0]
  }

  return errors[fieldName]
}

const handleCheckErrorTap = (name: string) => {
  fieldsCurrentTabKeys.value[name] = fieldsErrorTabKeys.value[name]?.[0] ?? ''
}

const isCurrentTabKeyErr = (name: string) => {
  return fieldsErrorTabKeys.value[name]?.includes(
    fieldsCurrentTabKeys.value[name],
  )
}

const isOptional = (name: string) => {
  return validationSchema.value.shape[name] instanceof ZodOptional
}

type Values = R extends AnyZodObject ? z.infer<R> : Prettify<FormValues<F>>

const constructTranslationArr = <V = Values>(values: V) => {
  const ret = {} as V
  const translations: { langKey: string; [k: string]: unknown }[] =
    languages.map((item) => {
      return {
        langKey: item.key,
      }
    })

  for (const field of fields) {
    const name = field.name as keyof V

    if (field['translation']) {
      const v = values[name] as Record<string, unknown>

      translations.forEach((item) => {
        item[name as string] = v[item.langKey]
      })
    } else {
      ret[name] = values[name]
    }
  }

  if (translations.length) {
    return {
      ...ret,
      translations,
    }
  }

  return ret
}

const deconstructTranslationArr = <R>({
  translations,
  ...rest
}: R & { translations: { langKey: string; [k: string]: unknown }[] }) => {
  const tFields: Record<string, any> = {}

  for (const item of translations) {
    for (const [key, value] of Object.entries(item)) {
      const name = key
      if (name !== 'langKey') {
        const langKey = item['langKey']
        if (tFields[name]) {
          tFields[name][langKey] = value
        } else {
          tFields[name] = { [langKey]: value }
        }
      }
    }
  }

  return {
    ...tFields,
    ...rest,
  }
}

const isTranslationField = (field: string) => {
  let ret = false
  fields.forEach((item) => {
    if (item.name === field) {
      ret = Boolean(item.translation)
    }
  })

  return ret
}

const resolveTranslationFields = (field: string) => {
  if (isTranslationField(field)) {
    return languages.map((lang) => {
      return `${field}.${lang.key}`
    })
  }

  return [field]
}

// Reset all errors
const resetErrors = () => {
  const errs = fields
    .map((field) => field.name)
    .reduce((o, field) => {
      o[field] = undefined
      return o
    }, {} as Record<string, undefined>)
  setErrors(errs)
}

const submit = async () => {
  // TODO: The validate or handleSubmit function may work now
  const validationFields = fields
    .filter((field) => isEnabled(field.enabled))
    .map((field) => field.name)

  const resolvedFields = validationFields
    .map((field) => resolveTranslationFields(field))
    .flat()

  return Promise.allSettled(
    resolvedFields.map((field) => validateField(field)),
  ).then((res) => {
    const validCount = res.reduce((count, info) => {
      if (info.status === 'fulfilled' && info.value.valid) {
        count++
      }

      return count
    }, 0)

    if (validCount === resolvedFields.length) {
      // TODO: translation types
      return Promise.resolve(
        constructTranslationArr(values) as Values & { translations: any[] },
      )
    }

    const filteredErrs = computed(() => {
      return pick(errors.value, resolvedFields)
    })

    const filteredErrBag = computed(() => {
      return pick(errors.value, resolvedFields)
    })

    return Promise.reject({ filteredErrs, filteredErrBag })
  })
}

const reset = () => {
  handleReset()
}

// TODO: translation types
const setFormVals = (values: any) => {
  setValues(values.translations ? deconstructTranslationArr(values) : values)
}

defineExpose({
  values: values as Values,
  submit,
  reset,
  setFormVals,
})
</script>

<template>
  <el-form label-width="auto">
    <template
      v-for="{
        as,
        label,
        name,
        options,
        attrs,
        translation,
        formItemSlots,
        enabled,
      } in fields"
      :key="name"
    >
      <!-- Custom ElFormItem -->
      <template
        v-if="as === 'ElFormItem' && attrs?.slots && isEnabled(enabled)"
      >
        <el-form-item
          :label="t(label)"
          :error="findErrMsg(errors, name, translation)"
          :required="!isOptional(name)"
          v-bind="attrs"
        >
          <template
            v-for="(slotFn, slotName) in attrs.slots || {}"
            #[slotName]
            :key="slotName"
          >
            <template v-if="typeof slotFn === 'function'">
              <component
                v-for="(slot, index) in slotFn()"
                :is="slot"
                :key="index"
              ></component>
            </template>
          </template>
        </el-form-item>
      </template>

      <!-- Normal Form Components -->
      <template v-else>
        <el-form-item
          v-if="isEnabled(enabled)"
          :label="t(label)"
          :error="findErrMsg(errors, name, translation)"
          :required="!isOptional(name)"
          :class="{ 'is-ok': translation && !isCurrentTabKeyErr(name) }"
        >
          <!-- FormItem label slot -->
          <template #label>
            <div v-if="formItemSlots && formItemSlots['label']">
              <template v-if="typeof formItemSlots['label'] === 'function'">
                <component
                  v-for="(slot, index) in formItemSlots['label']({ label })"
                  :is="slot"
                  :key="index"
                ></component>
              </template>
            </div>
          </template>

          <!-- Checkbox and Radio -->
          <template v-if="isSpecialCmp(as) && isSpecialOpts(options)">
            <app-form-cmp
              :languages
              v-for="item in options"
              :key="item.value"
              :field="{
                type: normalizeType(as),
                as,
                name,
                translation,
                attrs,
                slots: attrs?.slots,
                checkedValue: item.value,
                label: t(item.label),
              }"
            />

            <!-- FormItem default slot -->
            <template
              v-if="
                formItemSlots &&
                formItemSlots['default'] &&
                typeof formItemSlots['default'] === 'function'
              "
            >
              <component
                v-for="(slot, index) in formItemSlots['default']({})"
                :is="slot"
                :key="index"
              ></component>
            </template>
          </template>

          <!-- Other Form Components -->
          <template v-else>
            <app-form-cmp
              :languages
              :field="{
                type: normalizeType(as),
                as,
                name,
                translation,
                slots: attrs?.slots,
                label: t(label),
                attrs: { ...attrs },
              }"
            />

            <!-- FormItem default slot -->
            <template
              v-if="
                formItemSlots &&
                formItemSlots['default'] &&
                typeof formItemSlots['default'] === 'function'
              "
            >
              <component
                v-for="(slot, index) in formItemSlots['default']({})"
                :is="slot"
                :key="index"
              ></component>
            </template>
          </template>

          <!-- FormItem error slot -->
          <template #error="{ error }">
            <div class="validation-error">
              <span class="validation-error--msg">
                {{
                  t(error, {
                    langName: getLangNameByKey(
                      isCurrentTabKeyErr(name)
                        ? fieldsCurrentTabKeys[name]
                        : fieldsErrorTabKeys[name]?.[0],
                    ),
                    label: t(label),
                  })
                }}
              </span>
              <span
                v-show="error && translation && !isCurrentTabKeyErr(name)"
                class="cursor-pointer pl-1 text-[var(--el-color-primary)]"
                @click="handleCheckErrorTap(name)"
              >
                {{ t('check') }}
              </span>
            </div>
          </template>
        </el-form-item>
      </template>
    </template>
  </el-form>
</template>

<style scoped lang="scss">
:deep(.is-ok .el-input__wrapper),
:deep(.is-ok .el-input__wrapper.is-focus),
:deep(.is-ok .el-input__wrapper:hover),
:deep(.is-ok .el-textarea__inner),
:deep(.is-ok .el-textarea__inner.is-focus),
:deep(.is-ok .el-textarea__inner:hover) {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset;
}

.validation-error {
  display: flex;
  align-items: center;
  font-size: 12px;
  left: 0;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;

  &--msg {
    color: var(--el-color-danger);
    line-height: 1;
  }
}
</style>
