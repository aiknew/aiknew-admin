<script setup lang="ts">
import { ElColorPicker } from 'element-plus'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppThemeColorItem from './app-theme-color-item.vue'
import { useThemeSettingStore } from '../../../stores'

const themeSettingStore = useThemeSettingStore()
const { setThemeColor } = themeSettingStore
const { t } = useI18n()
const presetThemeColors = {
  '#409eff': () => t('skyBlue'),
  '#2ecc71': () => t('jadeGreen'),
  '#e94364': () => t('roseRed'),
  '#eddf1f': () => t('lemonYellow'),
  '#7d5fff': () => t('grapePurple'),
  '#ff7f50': () => t('coralOrange'),
  '#3bb4c1': () => t('lakeBlue'),
  '#D4AF37': () => t('champagneGold'),
  '#6B5B95': () => t('lavender'),
  '#722F37': () => t('burgundy'),
  '#6F4E37': () => t('coffee'),
  '#00897B': () => t('celadon'),
  '#546E7A': () => t('graphite'),
  '#37c237': () => t('cyanMist'),
  '#1976D2': () => t('navyBlue'),
  '#e96893': () => t('peachPink'),
  '#2E7D32': () => t('darkGreen'),
  '#FFBF00': () => t('amber'),
  '#708090': () => t('slateGray')
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

<i18n lang="yaml">
en:
  skyBlue: Sky Blue
  custom: custom
  jadeGreen: Jade Green
  roseRed: Rose Red
  lemonYellow: Lemon Yellow
  grapePurple: Grape Purple
  coralOrange: Coral Orange
  lakeBlue: Lake Blue
  champagneGold: Champagne Gold
  lavender: Lavender
  burgundy: Burgundy
  coffee: Coffee
  celadon: Celadon
  graphite: Graphite
  cyanMist: Cyan Mist
  navyBlue: Navy Blue
  peachPink: Peach Pink
  darkGreen: Dark Green
  amber: Amber
  slateGray: Slate Gray
zh-TW:
  skyBlue: 天藍色
  custom: 自定義
  jadeGreen: 翡翠綠
  roseRed: 玫瑰紅
  lemonYellow: 檸檬黃
  grapePurple: 葡萄紫
  coralOrange: 珊瑚橙
  lakeBlue: 湖藍色
  champagneGold: 香檳金
  lavender: 薰衣草
  burgundy: 勃艮第
  coffee: 咖啡色
  celadon: 青瓷色
  graphite: 石墨灰
  cyanMist: 翠青岚
  navyBlue: 海軍藍
  peachPink: 蜜桃粉
  darkGreen: 墨綠色
  amber: 琥珀色
  slateGray: 石板灰
zh-CN:
  skyBlue: 天蓝色
  custom: 自定义
  jadeGreen: 翡翠绿
  roseRed: 玫瑰红
  lemonYellow: 柠檬黄
  grapePurple: 葡萄紫
  coralOrange: 珊瑚橙
  lakeBlue: 湖蓝色
  champagneGold: 香槟金
  lavender: 薰衣草
  burgundy: 勃艮第
  coffee: 咖啡色
  celadon: 青瓷色
  graphite: 石墨灰
  cyanMist: 翠青嵐
  navyBlue: 海军蓝
  peachPink: 蜜桃粉
  darkGreen: 墨绿色
  amber: 琥珀色
  slateGray: 石板灰
</i18n>

<style>
.el-color-picker__trigger {
  height: 32px;
}
</style>
