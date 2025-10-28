import { useCssVar, useDark, useStorage } from "@vueuse/core"
import { darken, lighten } from "color2k"
import { defineStore } from "pinia"
import { watch } from "vue"

const primaryColorVarNames = [
  "--el-color-primary",
  "--el-color-primary-dark-2",
  "--el-color-primary-light-3",
  "--el-color-primary-light-5",
  "--el-color-primary-light-7",
  "--el-color-primary-light-8",
  "--el-color-primary-light-9",
]

export const useThemeSettingStore = defineStore("adminSetting", () => {
  const currentThemeColor = useCssVar(primaryColorVarNames[0])
  const themeColors = useStorage<string[]>("themeColors", [])
  const isDark = useDark()
  const isUsingCustom = useStorage("isUsingCustomTheme", false)
  const customThemColor = useStorage("customThemColor", "#b31d1d")

  const calcThemeColors = (color: string) => {
    const colors: string[] = [color]
    const darkenFn = isDark.value ? lighten : darken
    const lightenFn = isDark.value ? darken : lighten

    colors.push(darkenFn(color, 0.1))

    const lightenColors = primaryColorVarNames.slice(2)
    return colors.concat(
      lightenColors.map((_, index) => {
        return lightenFn(color, (index + 1) * 0.6 * 0.1)
      }),
    )
  }

  const setBProgressColor = (color: string) => {
    const cssVar = useCssVar("--bprogress-color")
    cssVar.value = color
  }

  const _setThemeColors = (colors: string[]) => {
    primaryColorVarNames.forEach((name, index) => {
      if (index === 0) {
        currentThemeColor.value = colors[index]
        setBProgressColor(colors[index])
      } else {
        const cssVar = useCssVar(name)
        cssVar.value = colors[index]
      }
    })

    themeColors.value = colors
  }

  const setThemeColor = (color: string) => {
    _setThemeColors(calcThemeColors(color))
  }

  const restoreThemeColors = () => {
    if (themeColors.value.length > 0) {
      _setThemeColors(themeColors.value)
    }
  }

  watch(isDark, () => {
    // recalculate theme colors when dark mode changed
    if (currentThemeColor.value) {
      setThemeColor(currentThemeColor.value)
    }
  })

  return {
    isUsingCustom,
    customThemColor,
    currentThemeColor,
    restoreThemeColors,
    setThemeColor,
  }
})
