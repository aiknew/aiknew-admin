<script lang="ts" setup generic="LANG extends string">
import localeSVG from './icons/locale.svg'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export interface Props<LANG extends string> {
  languages: LANG[]
  currentLanguage: LANG
}

export interface Emits<LANG extends string> {
  (e: 'switchLang', key: LANG): void
}

const { languages, currentLanguage } = defineProps<Props<LANG>>()
defineEmits<Emits<LANG>>()
</script>

<template>
  <div class="language-switcher">
    <el-dropdown @command="$emit('switchLang', $event)">
      <span class="el-dropdown-link">
        <localeSVG width="22" height="22" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="val in languages" :key="val" :command="val">
            <span :class="{ active: val === currentLanguage }">{{ val }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style>
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
