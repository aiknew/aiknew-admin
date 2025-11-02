<script lang="ts" setup>
import { useLogin, useLoginCaptcha, type LoginBody } from "@/api/auth"
import { AppLanguageSwitcher, AppAltcha } from "@aiknew/shared-ui-components"
import { useUserStore } from "@/stores/user"
import {
  type FormInstance,
  type FormRules,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton,
} from "element-plus"
import { computed, useTemplateRef } from "vue"
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import {
  setCurrentLang,
  languages,
  currentLang,
} from "@aiknew/shared-ui-locales"
import { useConfigValue } from "@/api/system-config"
import {
  LoginVerificationTypeKey,
  DefaultVerificationType,
} from "@aiknew/shared-constants"
import { VerificationTypeEnum } from "@aiknew/shared-enums"
import { watch } from "vue"

const { t } = useI18n()
const userStore = useUserStore()
const altchaRef = useTemplateRef("altchaRef")
const { mutate: loginApi, isPending: isLogging } = useLogin()
const {
  data: captchaData,
  isFetching: isFetchingCaptcha,
  refetch: fetchCaptcha,
} = useLoginCaptcha()
const { data: configValue, isFetching: isFetchingConfig } = useConfigValue(
  LoginVerificationTypeKey,
)
const verificationType = computed(() => {
  const value = configValue.value?.value

  if (!value || !Object.keys(VerificationTypeEnum).includes(value)) {
    return DefaultVerificationType
  }

  return value
})
const altchaPayload = ref("")
const loginFormRef = ref<FormInstance>()
const loginFormData = reactive<LoginBody>({
  userName: "",
  password: "",
  captchaKey: "",
  captchaCode: "",
  altchaPayload: "",
})

watch(verificationType, () => {
  if (verificationType.value === VerificationTypeEnum.CAPTCHA) {
    fetchCaptcha()
  }
})

const isLoading = computed(() => {
  return isFetchingCaptcha.value || isLogging.value || isFetchingConfig.value
})

const disabledSubmitBtn = computed(() => {
  return (
    isLoading.value ||
    (verificationType.value === VerificationTypeEnum.ALTCHA &&
      !Boolean(altchaPayload.value))
  )
})

const rules = computed(() => {
  const res: FormRules = {
    userName: [
      { required: true, message: t("inputUserName"), trigger: "blur" },
    ],
    password: [
      { required: true, message: t("inputPassword"), trigger: "blur" },
    ],
  }

  if (verificationType.value === VerificationTypeEnum.CAPTCHA) {
    res["captchaCode"] = [
      {
        required: true,
        message: t("inputCaptcha"),
        trigger: "blur",
      },
    ]
  }

  return res
})

const resetVerification = () => {
  if (verificationType.value === VerificationTypeEnum.CAPTCHA) {
    fetchCaptcha()
  } else if (verificationType.value === VerificationTypeEnum.ALTCHA) {
    altchaRef.value?.reset()
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      let data = { ...loginFormData }

      if (verificationType.value === VerificationTypeEnum.CAPTCHA) {
        if (captchaData.value) {
          data = {
            ...data,
            captchaKey: captchaData.value.key,
          }
        } else {
          fetchCaptcha()
        }
      } else if (verificationType.value === VerificationTypeEnum.ALTCHA) {
        data = {
          ...data,
          altchaPayload: altchaPayload.value,
        }
      }

      loginApi(data, {
        onSuccess(data) {
          userStore.login(data)
        },
        onError: resetVerification,
      })
    }
  })
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-[url(@/assets/svg/bg.svg)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="bg-theme-bg flex w-[80%] max-w-[800px] rounded-xl px-6 pb-8 pt-5"
    >
      <!-- Brand Info -->
      <div
        class="hidden h-[300px] w-[68%] bg-[url(@/assets/svg/login.svg)] bg-cover bg-center bg-no-repeat p-12 md:block"
      ></div>

      <div class="flex grow flex-col">
        <!-- Language Switcher -->
        <AppLanguageSwitcher
          :languages
          :current-language="currentLang"
          @switch-lang="setCurrentLang"
          class="ml-auto"
        />
        <!-- Admin Logo And Name -->
        <div
          class="text-(--el-text-color-regular) my-3 w-full text-center text-2xl"
        >
          AIKNEW ADMIN
        </div>
        <!-- Login Form -->
        <ElForm
          :model="loginFormData"
          :rules="rules"
          size="large"
          ref="loginFormRef"
        >
          <ElFormItem prop="userName">
            <ElInput
              prefix-icon="User"
              :placeholder="t('inputUserName')"
              v-model="loginFormData.userName"
              @keyup.enter="submitForm(loginFormRef)"
            />
          </ElFormItem>

          <ElFormItem prop="password">
            <ElInput
              prefix-icon="Lock"
              :placeholder="t('inputPassword')"
              type="password"
              v-model="loginFormData.password"
              @keyup.enter="submitForm(loginFormRef)"
            />
          </ElFormItem>

          <ElFormItem
            prop="captchaCode"
            v-show="verificationType === VerificationTypeEnum.CAPTCHA"
          >
            <ElInput
              :placeholder="t('inputCaptcha')"
              v-model="loginFormData.captchaCode"
              @keyup.enter="submitForm(loginFormRef)"
            >
              <template #append>
                <div
                  class="flex h-[38px] w-[100px] cursor-pointer items-center justify-center bg-white"
                  v-html="captchaData?.captcha"
                  @click="fetchCaptcha()"
                ></div>
              </template>
            </ElInput>
          </ElFormItem>

          <ElFormItem v-show="verificationType === VerificationTypeEnum.ALTCHA">
            <AppAltcha ref="altchaRef" v-model:payload="altchaPayload" />
          </ElFormItem>

          <ElFormItem class="mb-0!">
            <ElButton
              class="w-full"
              type="primary"
              @click="submitForm(loginFormRef)"
              :disabled="disabledSubmitBtn"
              :loading="isLoading"
            >
              {{ t("loginBtn") }}
            </ElButton>
          </ElFormItem>
        </ElForm>
      </div>
    </div>
  </div>
</template>

<style>
.el-input-group__append {
  padding: 0 10px;
  background-color: #fff;
}
</style>
