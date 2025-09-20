<script setup lang="ts">
import { TipTap } from '@aiknew/element-plus-tiptap'

const model = defineModel<string>({ default: '' })
</script>

<template>
  <TipTap v-model="model" />
</template>
