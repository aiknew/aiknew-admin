<script setup lang="ts">
import { ElColorPicker } from "element-plus"
import { watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import AppThemeColorItem from "./app-theme-color-item.vue"
import { useThemeSettingStore } from "../../../stores"

const themeSettingStore = useThemeSettingStore()
const { setThemeColor } = themeSettingStore
const { t } = useI18n()
const presetThemeColors = {
  "#409eff": () => t("skyBlue"),
  "#2ecc71": () => t("jadeGreen"),
  "#e94364": () => t("roseRed"),
  "#eddf1f": () => t("lemonYellow"),
  "#7d5fff": () => t("grapePurple"),
  "#ff7f50": () => t("coralOrange"),
  "#3bb4c1": () => t("lakeBlue"),
  "#D4AF37": () => t("champagneGold"),
  "#6B5B95": () => t("lavender"),
  "#722F37": () => t("burgundy"),
  "#6F4E37": () => t("coffee"),
  "#00897B": () => t("celadon"),
  "#546E7A": () => t("graphite"),
  "#37c237": () => t("cyanMist"),
  "#1976D2": () => t("navyBlue"),
  "#e96893": () => t("peachPink"),
  "#2E7D32": () => t("darkGreen"),
  "#FFBF00": () => t("amber"),
  "#708090": () => t("slateGray"),
}

const handleCustomColorActiveChange = (color: string | null) => {
  if (color) {
    themeSettingStore.customThemColor = color
  }
}

const handleSelect = (color: string) => {
  themeSettingStore.isUsingCustom = false
  setThemeColor(color)
}

const handleSelectCustom = () => {
  themeSettingStore.isUsingCustom = true
}

watchEffect(() => {
  if (themeSettingStore.isUsingCustom) {
    setThemeColor(themeSettingStore.customThemColor)
  }
})
</script>

<template>
  <div class="mt-3 flex flex-wrap gap-2">
    <template v-for="(val, key) in presetThemeColors" :key="key">
      <AppThemeColorItem
        @select="handleSelect"
        :text="val()"
        :color="key"
        :current-theme-color="themeSettingStore.currentThemeColor"
      />
    </template>

    <AppThemeColorItem
      @select="handleSelect"
      @click="handleSelectCustom"
      :text="t('custom')"
      :color="themeSettingStore.customThemColor"
      :current-theme-color="themeSettingStore.currentThemeColor"
    >
      <el-color-picker
        class="w-full! opacity-0"
        v-model="themeSettingStore.customThemColor"
        @active-change="handleCustomColorActiveChange"
      />
    </AppThemeColorItem>
  </div>
</template>

<style>
.el-color-picker__trigger {
  height: 32px;
}
</style>
