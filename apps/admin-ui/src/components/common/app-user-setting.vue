<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElDropdown, ElAvatar, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const { t } = useI18n()
const { logout } = useUserStore()

const handleLogout = () => {
  logout()
}
</script>

<template>
  <div class="cursor-pointer px-1">
    <el-dropdown>
      <el-avatar icon="UserFilled" :size="30" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="router.push({ path: '/account-info' })">
            {{ t('accountSetting') }}
          </el-dropdown-item>
          <el-dropdown-item @click="handleLogout">
            {{ t('logout') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "accountSetting": "Account Settings",
    "logout": "Sign out"
  },
  "zh-CN": {
    "accountSetting": "账户设置",
    "logout": "登出"
  },
  "zh-TW": {
    "accountSetting": "賬戶設置",
    "logout": "登出"
  }
}
</i18n>
