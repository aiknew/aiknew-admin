<script lang="ts" setup>
import { useLogin, useLoginCaptcha, type LoginBody } from '@/api/auth'
import { AppLanguageSwitcher } from '@aiknew/shared-ui-components'
import { useUserStore } from '@/stores/user'
import {
  type FormInstance,
  type FormRules,
  ElForm,
  ElFormItem,
  ElInput,
  ElButton
} from 'element-plus'
import { computed } from 'vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setCurrentLang, languages, currentLang } from '@aiknew/shared-ui-locales'

const { t } = useI18n()
const userStore = useUserStore()
const { mutate: loginApi, isPending } = useLogin()
const {
  data: captchaData,
  isLoading: isLoadingCaptcha,
  refetch: refetchCaptcha
} = useLoginCaptcha()

const loginFormRef = ref<FormInstance>()
const loginFormData = reactive<LoginBody>({
  userName: '',
  password: '',
  captchaKey: '',
  captchaCode: ''
})

const isLoading = computed(() => {
  return isLoadingCaptcha || isPending
})

const rules = reactive<FormRules<LoginBody>>({
  userName: [{ required: true, message: t('inputUserName'), trigger: 'blur' }],
  password: [{ required: true, message: t('inputPassword'), trigger: 'blur' }],
  captchaCode: [{ required: true, message: t('inputCaptcha'), trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (captchaData.value) {
        loginApi(
          {
            ...loginFormData,
            captchaKey: captchaData.value.key
          },
          {
            onSuccess(data) {
              userStore.login(data)
            },
            onError() {
              refetchCaptcha()
            }
          }
        )
      } else {
        refetchCaptcha()
      }
    }
  })
}
</script>

<template>
  <div
    class="flex min-h-screen items-center justify-center bg-[url(@/assets/svg/bg.svg)] bg-cover bg-center bg-no-repeat"
  >
    <div class="bg-theme-bg flex w-[80%] max-w-[800px] rounded-xl px-6 pt-5 pb-8">
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
        <div class="my-3 w-full text-center text-2xl text-(--el-text-color-regular)">
          AIKNEW ADMIN
        </div>
        <!-- Login Form -->
        <el-form :model="loginFormData" :rules="rules" size="large" ref="loginFormRef">
          <el-form-item prop="userName">
            <el-input
              prefix-icon="User"
              :placeholder="t('inputUserName')"
              v-model="loginFormData.userName"
              @keyup.enter="submitForm(loginFormRef)"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              prefix-icon="Lock"
              :placeholder="t('inputPassword')"
              type="password"
              v-model="loginFormData.password"
              @keyup.enter="submitForm(loginFormRef)"
            />
          </el-form-item>
          <el-form-item prop="captchaCode">
            <el-input
              :placeholder="t('inputCaptcha')"
              v-model="loginFormData.captchaCode"
              @keyup.enter="submitForm(loginFormRef)"
            >
              <template #append>
                <div
                  class="flex h-[38px] w-[100px] cursor-pointer items-center justify-center bg-white"
                  v-html="captchaData?.captcha"
                  @click="refetchCaptcha()"
                ></div>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item class="mb-0!">
            <el-button
              class="w-full"
              type="primary"
              @click="submitForm(loginFormRef)"
              :loading="isLoading.value"
            >
              {{ t('loginBtn') }}
            </el-button>
          </el-form-item>
        </el-form>
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

<i18n lang="yaml">
en:
  inputUserName: 'Please enter your username'
  inputPassword: 'Please enter your password'
  inputCaptcha: 'Please enter the verification code'
  loginBtn: 'Log in'
zh-CN:
  inputUserName: '请输入用户名'
  inputPassword: '请输入密码'
  inputCaptcha: '请输入验证码'
  loginBtn: '登陆'
zh-TW:
  inputUserName: '請輸入用戶名'
  inputPassword: '請輸入密碼'
  inputCaptcha: '請輸入驗證碼'
  loginBtn: '登陸'
</i18n>
