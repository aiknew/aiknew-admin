import {
  type Component,
  computed,
  defineComponent,
  h,
  ref,
  toValue,
  type MaybeRefOrGetter,
} from "vue"
import {
  components,
  generateDefaultVal,
  generateValidators,
  type Components,
  type Field,
  type GetDefaultVals,
  type Prettify,
  type GetI18nFieldNames,
  type GetFieldsWithTranslations,
  isNormalField,
  type ExcludeField,
  normalizeSchema,
  isOptionalSchema,
  isNullableSchema,
} from "./form-utils"
import { useForm } from "@tanstack/vue-form"
import { isDefined, useWindowSize } from "@vueuse/core"
import type { ComponentProps, ComponentSlots } from "vue-component-type-helpers"
import { ElFormItem, ElForm } from "element-plus"
import AppTranslation from "./components/app-translation.vue"
import type { ILanguage } from "@aiknew/shared-types"
import AppFormItemErrMsg from "./components/app-form-item-err-msg.vue"
import DynamicFormItemStyles from "./dynamic-form-item.module.scss"
import { isObject } from "element-plus/es/utils/types.mjs"
import AppFormItemContainer from "./components/app-form-item-container.vue"
import { onLangChange } from "@aiknew/shared-ui-locales"

export interface Props<F extends readonly Field<string, keyof Components>[]> {
  formProps?: ComponentProps<typeof ElForm>
  fields: F | (() => F)
  languages?: ILanguage[]
  onSubmit?: (data: {
    values: Prettify<GetFieldsWithTranslations<F>>
    rawValues: Prettify<GetDefaultVals<F>>
    i18nFieldNames: Prettify<GetI18nFieldNames<F>>[]
  }) => void
}

const resolveCondition = (when?: MaybeRefOrGetter<boolean>) => {
  return isDefined(when) ? toValue(when) : true
}

const getI18nFieldNames = <
  F extends readonly Field<string, keyof Components>[],
>(
  fieldsArr: F,
): Prettify<GetI18nFieldNames<F>>[] => {
  return fieldsArr.filter((item) => item.i18n).map((item) => item.name) as never
}

const resolveI18nFields = <
  F extends readonly Field<string, keyof Components>[],
>(
  values: GetDefaultVals<F>,
  i18nFieldNames: string[],
  languages: ILanguage[],
): GetFieldsWithTranslations<F> => {
  const res: {
    translations: { langKey: string; [key: string]: unknown }[]
    [key: string]: unknown
  } = {
    translations: languages.map((lang) => {
      return {
        langKey: lang.key,
      }
    }),
  }

  for (const [key, val] of Object.entries(values)) {
    if (i18nFieldNames.includes(key) && isObject(val)) {
      res.translations.forEach((item) => {
        item[key] = val[item.langKey]
      })
      continue
    }

    res[key] = val
  }

  return res as never
}

const restoreI18nFields = <
  F extends readonly Field<string, keyof Components>[],
>(
  i18nValues: Prettify<GetFieldsWithTranslations<F>>,
): GetDefaultVals<F> => {
  const res: Record<string, unknown> = {}

  for (const [key, val] of Object.entries(i18nValues)) {
    if (key === "translations") {
      i18nValues.translations?.forEach((item) => {
        for (const [iKey, iVal] of Object.entries(item)) {
          if (iKey === "langKey") continue

          const i18nFieldObj = isObject(res[iKey]) ? res[iKey] : {}
          const langKey: string = item.langKey
          i18nFieldObj[langKey] = iVal
          res[iKey] = i18nFieldObj
        }
      })

      continue
    }

    res[key] = val
  }

  return res as never
}

export const useAppForm = <
  F extends readonly Field<string, keyof Components>[],
>(
  props: Props<F>,
) => {
  const { fields: fieldsOrFn, formProps = {}, languages = [], onSubmit } = props
  const fields = typeof fieldsOrFn === "function" ? fieldsOrFn() : fieldsOrFn
  const defaultValues = generateDefaultVal(fields)
  const i18nFieldNames = getI18nFieldNames(fields)
  const activeFieldTab = ref<Record<string, string>>(
    fields
      .filter((item) => item.i18n)
      .reduce(
        (o, item) => {
          if (isNormalField(item)) {
            o[item.name] = languages[0]?.key
          }
          return o
        },
        {} as Record<string, string>,
      ),
  )
  const activeFields = computed<F>(() => {
    const allFields =
      typeof fieldsOrFn === "function" ? fieldsOrFn() : fieldsOrFn
    return allFields.filter((field) => resolveCondition(field.when)) as never
  })

  const schemas = computed(() => {
    return generateValidators<F>(activeFields.value)
  })
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (onSubmit) {
        onSubmit({
          values: resolveI18nFields(value, i18nFieldNames, languages),
          rawValues: value,
          i18nFieldNames,
        })
      }
    },
    validators: {
      onChangeAsync: async ({ formApi }) => {
        await new Promise((resolve) => {
          // Asynchronous validation is used here to wait for the computed schemas to be updated before validation
          const errors = formApi.parseValuesWithSchema(schemas.value)

          if (errors) {
            throw errors
          }

          resolve(undefined)
        })
      },
      onSubmit: ({ formApi }) => {
        const errors = formApi.parseValuesWithSchema(schemas.value)
        return errors
      },
    },
  })

  const formErrors = form.useStore((state) => state.errors)

  type FormSlotProps = Parameters<
    ComponentSlots<typeof form.Field>["default"]
  >[0]

  const NormalFieldFormItem = ({
    item,
    slotProps,
  }: {
    item: Field<string, keyof Components>
    slotProps: FormSlotProps
  }) => {
    if (!isNormalField(item)) {
      return h(item.container.content)
    }

    const { field, state } = slotProps
    const handleChange = field.handleChange
    type FieldErr = {
      msg: string | undefined
      langKey?: string | undefined
    }
    const error = computed<FieldErr>(() => {
      if (item.i18n) {
        const fieldErrKey = `${item.name}.`
        const activeLangErrKey =
          fieldErrKey + `${activeFieldTab.value[item.name]}`
        if (formErrors.value.length > 0) {
          const errObj: Record<string, Record<string, string>[]> =
            formErrors.value[0] ?? {}
          const fieldErrs = Object.values(
            Object.keys(errObj).reduce(
              (o, key) => {
                if (key.includes(fieldErrKey)) {
                  o[key] = errObj[key]
                }
                return o
              },
              {} as typeof errObj,
            ),
          ).flat()
          const fieldActiveLangErrs = errObj[activeLangErrKey]

          if (fieldActiveLangErrs?.length) {
            return {
              msg: fieldActiveLangErrs[0].message,
              langKey: fieldActiveLangErrs[0].path?.[1] as string,
            }
          }

          if (fieldErrs?.length) {
            const langKey = fieldErrs[0].path?.[1] ?? ""
            const langName =
              languages.find((lang) => lang.key === langKey)?.name ?? ""

            return {
              msg: `[${langName}]: ${fieldErrs[0].message}`,
              langKey,
            }
          }
        }
      }

      return {
        msg: (state.meta.errors?.[0] as unknown as Record<string, string>)
          ?.message,
      }
    })

    const resolvedProps = (as: typeof item.as) => {
      if (typeof as === "string") {
        return
      }

      return as.props
    }

    const resolvedSlots = (as: typeof item.as) => {
      if (typeof as === "string") {
        return
      }

      return as.slots
    }

    const resolvedComp = (as: typeof item.as): Component => {
      if (typeof as === "string") {
        return components[as] as Component
      }

      return components[as.component] as Component
    }

    const compProps = resolvedProps(item.as)
    const compSlots = resolvedSlots(item.as)
    const comp = resolvedComp(item.as)
    const DynamicComp = () => {
      if (item.i18n) {
        return h(
          AppTranslation,
          {
            name: item.name,
            languages,
            activeLang: activeFieldTab.value[item.name],
            "onUpdate:activeLang": (lang) => {
              activeFieldTab.value[item.name] = lang
            },
            modelValue: state.value as never,
            "onUpdate:modelValue": handleChange as never,
          },
          ({
            value,
            setLangVal,
          }: {
            value: unknown
            setLangVal: (val: unknown) => void
          }) => {
            return h(
              comp,
              {
                name: item.name,
                modelValue: value,
                "onUpdate:modelValue": setLangVal,
                ref: typeof item.as !== "string" ? item.as.ref : undefined,
                ...compProps,
              },
              compSlots,
            )
          },
        )
      } else {
        return h(
          comp,
          {
            name: item.name,
            modelValue: state.value,
            "onUpdate:modelValue": handleChange,
            ref: typeof item.as !== "string" ? item.as.ref : undefined,
            ...compProps,
          },
          compSlots,
        )
      }
    }

    const isNotCurrentFieldLangErr =
      Boolean(error.value.langKey) &&
      error.value.langKey !== activeFieldTab.value[item.name]

    const schema = normalizeSchema(item.schema)
    return h(
      ElFormItem,
      {
        style: { display: toValue(item.hidden) ? "none" : undefined },
        label: item.label,
        required: !(isOptionalSchema(schema) || isNullableSchema(schema)),
        error: error.value.msg,
        class: { [DynamicFormItemStyles.isOk]: isNotCurrentFieldLangErr },
      },
      {
        default: () =>
          h(AppFormItemContainer, null, {
            default: DynamicComp,
            top: () => item.container?.topSlot && h(item.container.topSlot),
            left: () => item.container?.leftSlot && h(item.container.leftSlot),
            right: () =>
              item.container?.rightSlot && h(item.container.rightSlot),
            bottom: () =>
              item.container?.bottomSlot && h(item.container.bottomSlot),
          }),
        error: () =>
          h(AppFormItemErrMsg, {
            msg: error.value.msg,
            showCheckBtn: isNotCurrentFieldLangErr,
            onCheck() {
              const currentErrKey = error.value.langKey
              if (currentErrKey) {
                activeFieldTab.value[item.name] = currentErrKey
              }
            },
          }),
      },
    )
  }

  const ExcludeFieldFormItem = ({ item }: { item: ExcludeField }) => {
    return (
      <ElFormItem label={item.label}>
        <AppFormItemContainer>
          {{
            default: () => h(item.container.content),
            top: () => item.container.topSlot && h(item.container.topSlot),
            left: () => item.container.leftSlot && h(item.container.leftSlot),
            right: () =>
              item.container.rightSlot && h(item.container.rightSlot),
            bottom: () =>
              item.container.bottomSlot && h(item.container.bottomSlot),
          }}
        </AppFormItemContainer>
      </ElFormItem>
    )
  }

  const AppForm = defineComponent({
    setup(_, { slots }) {
      const renderFields = () => {
        return activeFields.value.map((item) => {
          if (isNormalField(item)) {
            return (
              <form.Field name={item.name} key={item.name}>
                {{
                  default: (slotProps: FormSlotProps) => (
                    <NormalFieldFormItem item={item} slotProps={slotProps} />
                  ),
                }}
              </form.Field>
            )
          }

          return <ExcludeFieldFormItem item={item} />
        })
      }

      const formKey = ref(0)
      onLangChange(() => {
        formKey.value++
      })

      const { width } = useWindowSize()
      const labelPosition = computed(() => {
        if (width.value < 560) {
          return "top"
        }

        return "right"
      })

      const mergedFormProps = computed(() => {
        return {
          "label-position": labelPosition.value,
          ...formProps,
        }
      })

      return () => (
        <>
          <ElForm
            {...mergedFormProps.value}
            label-width="auto"
            key={formKey.value}
          >
            {renderFields()}

            {slots.default?.()}
          </ElForm>
        </>
      )
    },
  })

  return {
    AppForm,
    formApi: (() => {
      type SkipFirstParam<Func> = Func extends (
        ...args: [unknown, ...infer Rest]
      ) => unknown
        ? Rest
        : never

      type Rest = SkipFirstParam<typeof form.reset>

      type ExtendFromApi = typeof form & {
        resetI18nValues: (
          i18nValues: Prettify<GetFieldsWithTranslations<F>>,
          ...rest: Rest
        ) => void
      }

      const extendedFormApi = form as ExtendFromApi

      extendedFormApi.resetI18nValues = (
        i18nValues: Prettify<GetFieldsWithTranslations<F>>,
        ...rest: Rest
      ) => {
        form.reset(restoreI18nFields(i18nValues), ...rest)
      }

      return extendedFormApi
    })(),
  }
}
