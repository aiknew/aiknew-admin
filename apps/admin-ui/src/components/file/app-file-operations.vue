<script setup lang="ts">
import { computed } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElRow, ElCol, ElSpace, ElInput, ElButton, ElSelect, ElOption } from 'element-plus'
import { SearchScopeEnum } from '@/enums'
import { useFileI18n } from './composables/use-file-i18n'

export interface FileOperationsProps {
  searchKeyword: string
  searchScope: SearchScopeEnum
  selectedCount: number
}

export interface FileOperationsEmits {
  (e: 'add-group'): void
  (e: 'upload'): void
  (e: 'search'): void
  (e: 'delete-selected'): void
  (e: 'clear-selected'): void
  (e: 'update:searchKeyword', value: string): void
  (e: 'update:searchScope', value: SearchScopeEnum): void
}

const { selectedCount } = defineProps<FileOperationsProps>()
const emit = defineEmits<FileOperationsEmits>()
const { t } = useFileI18n()

const hasSelected = computed(() => selectedCount > 0)
const handleInput = (val: string) => {
  emit('update:searchKeyword', val)
  emit('search')
}

const handleChangeSearchScope = (val: SearchScopeEnum) => {
  emit('update:searchScope', val)
  emit('search')
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
        :placeholder="t('enterSearchKeyword')"
        class="search-file"
      >
        <template #prepend>
          <el-select :model-value="searchScope" @change="handleChangeSearchScope">
            <el-option key="all" :label="t('all')" :value="SearchScopeEnum.ALL"></el-option>
            <el-option
              key="group"
              :label="t('currentGroup')"
              :value="SearchScopeEnum.CURRENT_GROUP"
            ></el-option>
          </el-select>
        </template>

        <template #append>
          <el-button @click="$emit('search')" :icon="Search" />
        </template>
      </el-input>
    </el-col>

    <el-col :xs="24" :sm="24" :md="16">
      <!-- Buttons -->
      <el-space class="operations-btns" wrap>
        <span class="selected-count-text" v-show="hasSelected">
          {{ t('selectedTips', { selectedCount }) }}
        </span>
        <el-button
          type="danger"
          v-show="hasSelected"
          @click="$emit('delete-selected')"
          v-permission:delete-file="'/content/file'"
        >
          {{ t('deleteSelected') }}
        </el-button>
        <el-button type="primary" v-show="hasSelected" plain @click="$emit('clear-selected')">
          {{ t('clearSelected') }}
        </el-button>
        <el-button
          type="primary"
          @click="$emit('upload')"
          v-permission:upload-file="'/content/file'"
        >
          {{ t('uploadFile') }}
        </el-button>
        <el-button @click="$emit('add-group')" v-permission:add-group="'/content/file'">
          {{ t('createGroup') }}
        </el-button>
      </el-space>
    </el-col>
  </el-row>
</template>

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
