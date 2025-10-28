<script setup lang="ts">
import { ElDrawer, ElText } from "element-plus"
import { Settings } from "lucide-vue-next"
import { computed, ref } from "vue"
import { useI18n } from "vue-i18n"
import { AppIcon } from "@aiknew/shared-ui-components"
import AppThemeSelect from "./app-theme-select/app-theme-select.vue"
import AppLayoutSelect from "./app-layout-select.vue"
import { useWindowSize } from "@vueuse/core"

const show = ref(false)
const { t } = useI18n()
const { width } = useWindowSize()

const drawerSize = computed(() => {
  if (width.value > 560) {
    return 300
  }

  return "60%"
})
</script>

<template>
  <div class="flex cursor-pointer items-center" @click="show = true">
    <AppIcon>
      <Settings :size="20" />
    </AppIcon>
    <ElDrawer v-model="show" :with-header="true" :size="drawerSize">
      <div>
        <div>
          <ElText tag="b">{{ t("pageLayout") }}</ElText>
          <AppLayoutSelect />
        </div>

        <div class="mt-8">
          <ElText tag="b">{{ t("themeColor") }}</ElText>
          <AppThemeSelect />
        </div>
      </div>
    </ElDrawer>
  </div>
</template>

<style>
.el-drawer__header {
  margin-bottom: 0;
}

.el-drawer__body {
  padding: 10px 20px;
}
</style>
