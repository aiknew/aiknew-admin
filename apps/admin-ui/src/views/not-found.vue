<script lang="ts" setup>
import { ElButton, ElResult } from "element-plus"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"

const { push } = useRouter()
const { t } = useI18n()
</script>

<template>
  <ElResult title="404" :sub-title="t('notFound.tips')">
    <template #extra>
      <ElButton type="primary" @click="push('/')">
        {{ t("notFound.backToHome") }}
      </ElButton>
    </template>
  </ElResult>
</template>
