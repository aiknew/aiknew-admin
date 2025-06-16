<script setup lang="ts">
import { ref } from 'vue'
import { ElLoading, ElDialog, ElButton } from 'element-plus'
import { useI18n } from 'vue-i18n'

export type ModalMode = 'add' | 'edit' | 'show'

interface Props {
  maxWidth?: number
  showCancelBtn?: boolean
  showFooter?: boolean
}

interface Emits {
  (e: 'submit'): void
  (e: 'opened'): void
  (e: 'closed'): void
}

withDefaults(defineProps<Props>(), {
  maxWidth: 600,
  showFooter: true
})

defineEmits<Emits>()
const { t } = useI18n()
const dialogRef = ref<InstanceType<typeof ElDialog>>()

const loadingInsArr: { close: () => void }[] = []
const showLoading = () => {
  loadingInsArr.push(
    ElLoading.service({
      target: dialogRef.value?.$el.nextElementSibling.querySelector('.el-dialog')
    })
  )
}

const hideLoading = () => {
  const loadingIns = loadingInsArr.shift()

  if (loadingIns) {
    loadingIns.close()
  }
}

const useTitle = () => {
  const title = ref('')
  const setTitle = (text: string) => {
    title.value = text
  }

  return {
    title,
    setTitle
  }
}

const useModalMode = () => {
  const modalMode = ref<ModalMode>('add')

  const setModalMode = (mode: ModalMode) => {
    modalMode.value = mode
  }

  return {
    modalMode,
    setModalMode
  }
}

const useModalVisible = () => {
  const visible = ref(false)

  const show = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    show,
    close
  }
}

const { title, setTitle } = useTitle()
const { modalMode, setModalMode } = useModalMode()
const { visible, show, close } = useModalVisible()

defineExpose({
  title,
  modalMode,
  setTitle,
  setModalMode,
  showLoading,
  hideLoading,
  show,
  close
})
</script>

<template>
  <el-dialog
    ref="dialogRef"
    :style="{ maxWidth: `${maxWidth}px` }"
    :title
    width="calc(100vw - 30px)"
    v-model="visible"
    v-bind="$attrs"
    @opened="$emit('opened')"
    @close="$emit('closed')"
  >
    <template v-slot:default="slotProps">
      <slot v-bind="slotProps" />
    </template>

    <template v-slot:header="slotProps">
      <slot name="header" v-bind="slotProps" />
    </template>

    <template v-slot:footer="slotProps">
      <slot name="footer" v-bind="slotProps">
        <span v-if="showFooter">
          <el-button @click="close()">
            {{ t('cancel') }}
          </el-button>
          <el-button type="primary" @click="$emit('submit')">
            {{ t('confirm') }}
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<style>
.form-item-tips {
  flex-basis: 100%;
  padding-top: 4px;
  font-size: 12px;
  line-height: 1.5;
  color: #999;
}

.el-radio-button {
  margin-bottom: 4px;
}
</style>
