<script lang="ts" setup generic="LANG extends string">
import localeSVG from './icons/locale.svg'
// import { useLangStore } from '@/stores/lang'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

// const langStore = useLangStore()

// const languages = {
//   'zh-CN': '简体中文',
//   'zh-TW': '繁体中文',
//   en: 'English',
// }

export interface Props<LANG extends string> {
  languages: Record<LANG, string>
  currentLanguage: LANG
}

export interface Emits<LANG> {
  (e: 'switchLang', key: LANG): void
}

const { languages, currentLanguage } = defineProps<Props<LANG>>()
defineEmits<Emits<LANG>>()
</script>

<template>
  <div class="language-switcher">
    <el-dropdown @command="$emit('switchLang', $event as LANG)">
      <span class="el-dropdown-link">
        <localeSVG width="22" height="22" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(val, key) in languages"
            :key="key"
            :command="key"
          >
            <span :class="{ active: key === currentLanguage }">{{ val }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.language-switcher {
  margin-left: auto;
}

.el-dropdown-link {
  outline: none;
  cursor: pointer;
}

.active {
  color: var(--el-color-primary);
}
</style>
