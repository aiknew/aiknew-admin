<script lang="ts" setup>
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import {
  ElDropdown,
  ElAvatar,
  ElDropdownMenu,
  ElDropdownItem,
} from "element-plus"
import { useUserStore } from "@/stores/user"

const router = useRouter()
const { t } = useI18n()
const { logout } = useUserStore()

const handleLogout = () => {
  logout()
}
</script>

<template>
  <div class="cursor-pointer px-1">
    <ElDropdown>
      <ElAvatar icon="UserFilled" :size="30" />
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem @click="router.push({ path: '/account-info' })">
            {{ t("accountSetting") }}
          </ElDropdownItem>
          <ElDropdownItem @click="handleLogout">
            {{ t("logout") }}
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
