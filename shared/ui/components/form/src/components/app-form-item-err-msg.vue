<script setup lang="ts">
import { t } from '@aiknew/shared-ui-locales'

interface Props {
  msg?: string
  showCheckBtn?: boolean
}

interface Emits {
  (e: 'check'): void
}

const { msg, showCheckBtn } = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<template>
  <div class="validation-error">
    <span class="validation-error--msg">
      {{ msg }}
    </span>
    <span
      class="cursor-pointer pl-1 text-[var(--el-color-primary)]"
      v-show="showCheckBtn"
      @click="emit('check')"
    >
      {{ t('check') }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.validation-error {
  display: flex;
  align-items: center;
  font-size: 12px;
  left: 0;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;

  &--msg {
    color: var(--el-color-danger);
    line-height: 1;
  }
}
</style>
