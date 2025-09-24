<script setup lang="ts">
import { computed } from 'vue'
import {
  ElRow,
  ElCol,
  ElSpace,
  ElInput,
  ElButton,
  ElSelect,
  ElOption,
} from 'element-plus'
import { SearchScopeEnum } from './enums'
import { useI18n } from 'vue-i18n'

export interface Props {
  searchKeyword: string | undefined
  searchScope: SearchScopeEnum
  selectedCount: number
  currentGroupId: string | undefined
}

export interface Emits {
  (e: 'add-group'): void
  (e: 'upload'): void
  (e: 'delete-selected'): void
  (e: 'clear-selected'): void
  (e: 'update:searchKeyword', value: string): void
  (e: 'update:searchScope', value: SearchScopeEnum): void
}

const { selectedCount } = defineProps<Props>()
const emit = defineEmits<Emits>()
const { t } = useI18n()

const hasSelected = computed(() => selectedCount > 0)
const handleInput = (val: string) => {
  emit('update:searchKeyword', val)
}

const handleChangeSearchScope = (val: SearchScopeEnum) => {
  emit('update:searchScope', val)
}
</script>

<template>
  <el-row class="file-operations" justify="space-between">
    <el-col :xs="24" :sm="24" :md="8">
      <!-- Search Files -->
      <el-input
        :model-value="searchKeyword"
        clearable
        @input="handleInput"
        :placeholder="t('filer.enterSearchKeyword')"
        class="search-file"
      >
        <template #prepend>
          <el-select
            :model-value="searchScope"
            @change="handleChangeSearchScope"
          >
            <el-option
              key="all"
              :label="t('all')"
              :value="SearchScopeEnum.ALL"
            ></el-option>
            <el-option
              key="group"
              :label="t('filer.currentGroup')"
              :value="SearchScopeEnum.CURRENT_GROUP"
            ></el-option>
          </el-select>
        </template>
      </el-input>
    </el-col>

    <el-col :xs="24" :sm="24" :md="16">
      <!-- Buttons -->
      <el-space class="operations-btns" wrap>
        <span class="selected-count-text" v-show="hasSelected">
          {{ t('filer.selectedTips', { selectedCount }) }}
        </span>
        <el-button
          type="danger"
          v-show="hasSelected"
          @click="$emit('delete-selected')"
          v-permission:delete-file="'/content/file'"
        >
          {{ t('filer.deleteSelected') }}
        </el-button>
        <el-button
          type="primary"
          v-show="hasSelected"
          plain
          @click="$emit('clear-selected')"
        >
          {{ t('filer.clearSelected') }}
        </el-button>
        <el-button
          v-show="currentGroupId"
          type="primary"
          @click="$emit('upload')"
          v-permission:upload-file="'/content/file'"
        >
          {{ t('filer.uploadFile') }}
        </el-button>
        <el-button
          v-show="currentGroupId"
          @click="$emit('add-group')"
          v-permission:add-group="'/content/file'"
        >
          {{ t('filer.createGroup') }}
        </el-button>
      </el-space>
    </el-col>
  </el-row>
</template>

<style>
.file-operations .el-select__wrapper,
.file-operations .el-input__wrapper {
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color))
    inset !important;
}
</style>

<style scoped lang="scss">
.file-operations {
  width: 100%;

  .operations-btns {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-width: 992px) {
      margin-top: 10px;
    }

    .selected-count-text {
      font-size: 12px;
      color: #999;
    }
  }

  .search-file {
    width: 100%;

    :deep(.el-select) {
      min-width: 100px;
    }
  }
}
</style>
