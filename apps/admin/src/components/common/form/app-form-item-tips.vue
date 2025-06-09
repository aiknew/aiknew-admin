<script setup lang="ts">
interface Props {
  text: string
}

defineProps<Props>()
</script>

<template>
  <div class="mt-1.5 w-full text-xs text-[#999]">{{ text }}</div>
</template>
