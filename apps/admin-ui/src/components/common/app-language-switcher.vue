<script lang="ts" setup>
import localeSVG from '@/assets/svg/locale.svg'
import { useLangStore } from '@/stores/lang'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

const langStore = useLangStore()

const languages = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  en: 'English',
}

</script>

<template>
  <div class="language-switcher">
    <el-dropdown @command="langStore.switchLang">
      <span class="el-dropdown-link">
        <localeSVG width="22" height="22" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="(val, key) in languages" :key="key" :command="key">
            <span :class="{ active: key === langStore.currentLang }">{{ val }}</span>
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
