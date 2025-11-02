<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue"

// Importing altcha package will introduce a new element <altcha-widget>
import "altcha"

const altchaWidget = ref<(HTMLElement & { reset(): void }) | null>(null)
const props = defineProps({
  payload: {
    type: String,
    required: false,
  },
})
const emit = defineEmits<{
  (e: "update:payload", value: string): void
}>()
const internalValue = ref(props.payload)

watch(internalValue, (v) => {
  emit("update:payload", v || "")
})

const onStateChange = (ev: CustomEvent | Event) => {
  if ("detail" in ev) {
    const { payload, state } = ev.detail
    if (state === "verified" && payload) {
      internalValue.value = payload
    } else {
      internalValue.value = ""
    }
  }
}

onMounted(() => {
  if (altchaWidget.value) {
    altchaWidget.value.addEventListener("statechange", onStateChange)
  }
})

onUnmounted(() => {
  if (altchaWidget.value) {
    altchaWidget.value.removeEventListener("statechange", onStateChange)
  }
})

const challengeurl = import.meta.env.VITE_API_BASE_URL + `/admin/auth/altcha`

const reset = () => {
  altchaWidget.value?.reset()
}

defineExpose({
  reset,
})
</script>

<template>
  <altcha-widget
    ref="altchaWidget"
    class="w-full"
    hidelogo
    hidefooter
    :challengeurl
  ></altcha-widget>
</template>

<style>
:root {
  --altcha-max-width: 100%;
  --altcha-color-border: var(--el-border-color);
  --altcha-color-border-focus: var(--el-border-color);
}
</style>
