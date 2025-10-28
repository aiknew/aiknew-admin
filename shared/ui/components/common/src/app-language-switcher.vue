<script lang="ts" setup generic="LANG extends string">
import { Globe } from "lucide-vue-next"
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus"
import AppIcon from "./app-icon.vue"

export interface Props<LANG extends string> {
  languages: LANG[]
  currentLanguage: LANG
}

export interface Emits<LANG extends string> {
  (e: "switchLang", key: LANG): void
}

const { languages, currentLanguage } = defineProps<Props<LANG>>()
defineEmits<Emits<LANG>>()
</script>

<template>
  <div class="flex items-center">
    <ElDropdown @command="$emit('switchLang', $event)">
      <AppIcon>
        <Globe :size="19" />
      </AppIcon>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem v-for="val in languages" :key="val" :command="val">
            <span :class="{ active: val === currentLanguage }">{{ val }}</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>

<style>
.active {
  color: var(--el-color-primary);
}
</style>
